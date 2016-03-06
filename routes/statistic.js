/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var config = require('config');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var logget = require('utils/log.js');
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
					if (result)
					{
						// Если нашли проверяем сколько игр он сыграл
						if (result.stat.length === config.get('maxGame'))
						{
							delete result.stat[0];
						}

						// Заносим в массив новое значение и апдейтим запись
						result.stat.push(req.body);
						Statistic.update(id, {stat: result.stat}, callback);
					} else
					{
						// Если не нашли запись создаем новую
						var newStat = new Statistic(
							{
								idUser: id,
								stat: req.body
							}
						);

						newStat.save(callback);
					}

				}
			], function (err)
			{
				if (err)
				{
					log(err);
					return next(new HttpError(401, "Ошибка с сохранением статистики"));
				}
			});
	}
	res.send(200);
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
				log(err);
				return next(new HttpError(401, "Нет такой статистики"));
			}
			res.json(data.stat);
		});
});

module.exports = router;
