/**
 * @since 16.02.17
 * @author greezlock
 */

var express = require('express');
var logger = require('utils/log')(module);

var Statistic = require('models/statistic').Statistic;

var lodash = require('lodash');

const checkAuthentication = require('./../../../middlewares/check-authentication');

var HttpStatus = require('http-status-codes');

var router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

/**
 * Получение статистики юзера о прохождении уроков.
 */
router.get('/', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	Statistic.getUserStatistics(idUser, function (err, result) {

		if (err) {

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

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


/**
 * ------------------------------------------------
 * POST
 * ------------------------------------------------
 */

/**
 * Сохранение данных о прохождении пользователем подурока.
 */
router.post('/', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;
	let dataForUpdate = req.body;

	Statistic.updateLessonStatistics(idUser, dataForUpdate, function (err) {

		if (err) {

			logger.warn(err);

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

		}

	});

	res.sendStatus(HttpStatus.ACCEPTED);

});

router.post('/star', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	let dataForUpdate = req.body;

	Statistic.updateLessonStarStatistics(idUser, dataForUpdate, function (err) {

		if (err) {

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

		}

	});

	res.sendStatus(HttpStatus.ACCEPTED);

});
