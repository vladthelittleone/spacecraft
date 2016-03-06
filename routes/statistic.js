/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var Statistic = require('models/statistic').Statistic;
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
						if (result.stat.length === 50)
						{
							delete result.stat[0];
						}

						// Заносим в массив новое значение и апдейтим запись
						result.stat.push(req.body);
						Statistic.findOneAndUpdate(id, {idUser: id, stat: result.stat}, callback);
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
					console.log("error");
				}
			});
	}
	res.send(200);
});

router.get('/', function (req, res, next)
{
	// Находим статистику юзера и отправляем
	Statistic.findOne({idUser: req.session.user}, (function (err, data)
	{
		if (err)
		{
			console.log(err);
		}
		console.log(data.stat);
		res.json(data.stat);
	}));
});

module.exports = router;
