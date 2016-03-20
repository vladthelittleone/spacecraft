/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var config = require('config');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var router = express.Router();

router.post('/', function (req, res, next)
{
	var id = req.session.user;

	if (id)
	{
		async.waterfall(
		[
			function (callback)
			{
				// Ищем статистику юзера в базе
				Statistic.findOne({idUser: id}, callback);
			},
			function (result, callback)
			{
				var stat = req.body;
				var maxScore = req.body.totalScore;

				if (result)
				{
					stat = result.stat;
					maxScore = (result.maxScore > maxScore) ? result.maxScore : maxScore;

					// Если нашли проверяем сколько игр он сыграл
					if (stat.length === config.get('maxStatisticsCount'))
					{
						 stat.splice(0,1);
					}

					stat.push(req.body);
				}

				Statistic.update({idUser: id},
					{
						stat: stat,
						maxScore: maxScore
					},
					{upsert: true, multi: true},
					callback);
			}
		],
		function (err)
		{
			if (err)
			{
				return next(new HttpError(500, "Ошибка с сохранением статистики"));
			}
		});
	}

	res.send([]);
});

router.get('/', function (req, res, next)
{
	async.waterfall(
	[
		function (callback)
		{
			// Находим статистику юзера и отправляем
			Statistic.findOne({idUser: req.session.user}, callback)
		}
	],
	function (err, data)
	{
		if (err)
		{
			return next(new HttpError(400, "Нет такой статистики"));
		}

		if (data)
		{
			res.json(data.stat);
		}
		else
		{
			res.send([]);
		}
	});
});

router.get('/score', function (req, res, next)
{
	async.waterfall(
	[
		function (callback)
		{
			Statistic.find(({ maxScore: { $ne: null } }))
				.populate('idUser')
				.sort('-maxScore')
				.exec(callback);
		}
	],
	function (err, user)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка с поиском лучших пользователей"));
		}

		if (user)
		{
			var great = [];

			user.forEach(function (u,i)
			{
				great.push({
					username: u.idUser.username || u.idUser.email,
					maxScore: u.maxScore
				});

				if (i === 9)
				{
					return false;
				}
			});

			res.json(great);
		}
	});
});

module.exports = router;
