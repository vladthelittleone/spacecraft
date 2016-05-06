/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var config = require('config');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var router = express.Router();

// Сохранение статистики по играм пользователей
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
				// Максимальное чилос очков за все игры пользователя
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

				// Апдейт записи о статистики. создание новой записи если ее нет
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

// Получение статисик юзера
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

// Получаем из базы стату по максимальным очкам юзеров
router.get('/score', function (req, res, next)
{
	async.waterfall(
	[
		function (callback)
		{
			// Join запрос, соедниям 2 таблицы статистику и юзеров
			// Берем не пустые поля макс очков и сортируем по убыванию
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

			// Делаем массив из 10 лучших юзеров
			user.forEach(function (u,i)
			{
				great.push({
					username: u.idUser.username || u.idUser.email,
					maxScore: u.maxScore
				});

				if (i === 9)
				{
					return;
				}
			});

			res.json(great);
		}
		else
		{
			res.send();
		}
	});
});

// Запись статы о прохождении уроков юзером
router.post('/lessons', function(req, res, next)
{
	var id = req.session.user;
	var lesId = req.body.lessonId;

	if (id)
	{
		async.waterfall(
		[
			function (callback)
			{
				// Ищем статистику юзера в базе
				Statistic.findOne({idUser: id}, callback);
			},
			function(result, callback)
			{
				var lessons = req.body;

				// Если в базе была стата об уроках
				if(result && result.lessons)
				{
					lessons = result.lessons;
					lessons[lesId] = req.body;
					lessons[lesId].completed = req.body.completed || lessons[lesId].completed;
				}

				// Апдейт записи о статистики. создание новой записи если ее нет
				Statistic.update({idUser: id},
				{
					lessons: lessons
				},
				{upsert: true, multi: true},
				callback);
			}
		],
		function(err)
		{
			if(err)
			{
				next(new HttpError(500, "Ошибка с сохранением урока"));
			}
		});
	}

	res.send([]);
});

// Получение статистики юзера о прохождении уроков
router.get('/lessons', function(req, res, next)
{
	async.waterfall(
	[
		function(callback)
		{
			Statistic.findOne({idUser: req.session.user}, callback);
		}
	],
	function(err, result)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка с поиском лучших пользователей"));
		}

		if (result)
		{
			res.json(result.lessons);
		}
		else
		{
			res.send([]);
		}
	});
});

router.post('/lessons/stars', function(req, res, next)
{
	async.waterfall(
		[
			function(callback)
			{
				Statistic.findOne({idUser: req.session.user}, callback);
			},
			function(result, callback)
			{
				var lessons = result.lessons;
				var lesId = req.body.idLesson;
				lessons[lesId].stars = req.body.stars;

				Statistic.update({idUser: req.session.user},
					{
						lessons: lessons
					},
					{multi: true},
					callback);
			}
		],

		function(err)
		{
			if (err)
			{
				return next(new HttpError(500, "Ошибка сохранения оценки урока"));
			}

			res.sendStatus(200);
		});
});

// Сохраняем код в базе
router.post('/code', function(req, res, next)
{
	async.waterfall(
		[
			function(callback)
			{
				Statistic.update({idUser: req.session.user},
					{
						code: req.body.code
					},
					{upsert: true, multi: true},
					callback);
			}
		],
		function(err)
		{
			if (err)
			{
				return next(new HttpError(500, "Ошибка сохранения кода"));
			}

			res.sendStatus(200);
		});
});

// Ищем код в базе
router.get('/code', function(req, res, next)
{
	async.waterfall(
		[
			function(callback)
			{
				Statistic.findOne({idUser: req.session.user}, callback);
			}
		],
		function(err, result)
		{
			if (err)
			{
				return next(new HttpError(500, "Ошибка поиска кода"));
			}

			res.json(result.code);
		});
});

module.exports = router;
