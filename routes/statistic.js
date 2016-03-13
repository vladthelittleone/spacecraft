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
		async.waterfall([
			function (callback)
			{
				// Ищем статистику юзера в базе
				Statistic.findOne({idUser: id}, callback);
			},
			function (result, callback)
			{
				if (result)
				{
					// Если нашли проверяем сколько игр он сыграл
					if (result.stat.length === config.get('maxStatisticsCount'))
					{
						delete result.stat[0];
					}


					result.stat.push(req.body);
					// Заносим в массив новое значение и апдейтим запись
					if (result.maxScore > req.body.totalScore)
					{
						Statistic.update(id, {stat: result.stat}, {multi: true}, callback);
					} else
					{
						Statistic.update(id, {
							stat: result.stat,
							maxScore: req.body.totalScore
						}, {multi: true}, callback);
					}
				} else
				{
					// Если не нашли запись создаем новую
					var newStat = new Statistic(
						{
							idUser: id,
							stat: req.body,
							maxScore: req.body.totalScore
						}
					);
					newStat.save(callback);
				}

			}
		], function (err)
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
			}], function (err, data)
		{
			if (err)
			{
				return next(new HttpError(400, "Нет такой статистики"));
			}
			if (data)
			{
				res.json(data.stat);
			} else
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
				Statistic.find().populate('idUser').sort('-maxScore').exec(callback);
			},
			function (user, callback)
			{
				if (user)
				{
					var great = [];

					user.forEach(function (u, i, user)
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
			}
		], function (err)
		{
			if (err)
			{
				return next(new HttpError(500, "Ошибка с поиском лучших пользователей"));
			}
		});
});

module.exports = router;
