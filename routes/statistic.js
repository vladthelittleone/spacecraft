/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var config = require('config');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var router = express.Router();
var Cohorts = require('models/cohorts').Cohorts;

// Сохранение статистики по играм пользователей
router.post('/', function (req, res, next)
{
	var id = req.session.user;

	if (id)
	{
		Statistic.updateGameStatistics(id, req, function (err)
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
	Statistic.getUserStatistics(req.session.user, function (err, data)
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
	Statistic.getUserWithBestScore(function (err, user)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка с поиском лучших пользователей"));
		}

		if (user)
		{
			var bestUsers = [];
			// Делаем массив из 10 лучших юзеров и выкидываем из
			// выборки лишнии данные
			user.slice(0, 9).forEach(function(item)
			{
				bestUsers.push({
					username: item.idUser.username || item.idUser.email,
					maxScore: item.maxScore
				});
			});

			res.json(bestUsers);
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

	if (id)
	{
		Statistic.updateLessonStatistics(id, req, function(err)
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
	Statistic.getUserStatistics(req.session.user, function(err, result)
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
	Cohorts.updateCohort(req.session.user, function(cohort, cohortID) {

		if (cohort) {

			var lessonsID = req.body.idLesson;
			var lessons = cohort.cohorts[cohortID].lessons;
			var lesson = lessons[lessonsID];
			var star = req.body.stars;

			if (lesson)
			{

				lesson.numb += 1;
				lesson.starsSum += star;
			}
			else
			{

				lessons[lessonsID] =
				{
					numb: 1,
					starsSum: star
				}
			}
			// cohort.cohorts[cohortID].lessons[lesId] += req.body.stars;
		}
	});

	Statistic.updateLessonStarStatistics(req, function(err)
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
	Statistic.updateUserCode(req, function(err)
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
	Statistic.getUserStatistics(req.session.user, function(err, result)
	{
		if (err)
		{
			return next(new HttpError(500, "Ошибка поиска кода"));
		}

		res.json(result ? result.code : null);
	});
});

module.exports = router;
