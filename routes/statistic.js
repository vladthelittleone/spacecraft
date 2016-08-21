/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var Statistic = require('models/statistic').Statistic;
var HttpError = require('error').HttpError;
var router = express.Router();
var Cohorts = require('models/cohorts').Cohorts;

// Запись статы о прохождении уроков юзером
router.post('/lessons', function(req, res, next) {

	var id = req.session.user;

	if (id) {

		Statistic.updateLessonStatistics(id, req, function(err) {

			if(err) {

				next(new HttpError(400, "Ошибка с сохранением урока"));
			}

		});

	}

	res.send([]);

});

// Получение статистики юзера о прохождении уроков
router.get('/lessons', function(req, res, next) {

	Statistic.getUserStatistics(req.session.user, function(err, result) {

		if (err) {

			return next(new HttpError(400, "Ошибка с поиском лучших пользователей"));
		}

		if (result) {

			res.json(result.lessons);

		} else {

			res.send([]);
		}
	});

});

router.post('/lessons/stars', function(req, res, next) {

	Cohorts.updateCohort(req.session.user, function(data, cohortID) {

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

					numb: 1,
					starsSum: star
				}

			}
		}
	});

	Statistic.updateLessonStarStatistics(req, function(err) {

		if (err) {

			return next(new HttpError(400, "Ошибка сохранения оценки урока"));
		}

		res.sendStatus(200);
	});

});

module.exports = router;
