/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var logger = require('../utils/log')(module);

var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var Cohorts = require('models/cohorts').Cohorts;

var router = express.Router();

// Запись статы о прохождении уроков юзером
router.post('/lessons', function (req, res, next) {

	let userId = req.user;
	let dataForUpdate = req.body;

	Statistic.updateLessonStatistics(userId, dataForUpdate, function (err) {

		if (err) {

			logger.warn(err);

			next(new HttpError(400, "Ошибка с сохранением урока"));

		}

	});

	res.send([]);

});

// Получение статистики юзера о прохождении уроков
router.get('/lessons', function (req, res, next) {

	Statistic.getUserStatistics(req.user, function (err, result) {

		if (err) {

			return next(new HttpError(400, "Ошибка с получением статистики пользователя."));

		}

		if (result) {

			// Отправляем массив уроков и финальное число очков по всем урокам
			// отделными полями.
			res.json({
				lessons:         result.lessons,
				totalFinalScore: result.totalFinalScore
			});

		} else {

			res.send([]);

		}

	});

});

router.post('/lessons/stars', function (req, res, next) {

	Cohorts.updateCohort(req.user, function (data, cohortID) {

		if (data) {

			var lessonsID = req.body.idLesson;
			var lessons = data.cohorts[cohortID].lessons;
			var lesson = lessons[lessonsID];

			var star = req.body.stars;

			if (lesson) {

				lesson.numb += 1;
				lesson.starsSum += star;

			} else {

				lessons[lessonsID] = {

					numb:     1,
					starsSum: star

				}

			}

		}

	});

	let userId = req.user;
	let dataForUpdate = req.body;

	Statistic.updateLessonStarStatistics(userId, dataForUpdate, function (err) {

		if (err) {

			return next(new HttpError(400, "Ошибка сохранения оценки урока"));

		}

		res.sendStatus(200);

	});

});

module.exports = router;
