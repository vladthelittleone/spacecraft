'use strict';

/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');
const logger = require('utils/log')(module);

const Statistic = require('models/statistic');

const lodash = require('lodash');

const checkAuthentication = require('./../../../middlewares/check-authentication');

const HttpStatus = require('http-status-codes');

const router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

/**
 * Получение статистики юзера о прохождении уроков.
 */
router.get('/user/statistics/lessons', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;

	Statistic.getUserStatistics(idUser, (err, result) => {

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
router.post('/user/statistics/lessons', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;
	let dataForUpdate = req.body;

	Statistic.updateLessonStatistics(idUser, dataForUpdate, (err) => {

		if (err) {

			logger.warn(err);

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

		}

	});

	res.sendStatus(HttpStatus.ACCEPTED);

});

router.post('/user/statistics/lessons/star', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;

	let dataForUpdate = req.body;

	Statistic.updateLessonStarStatistics(idUser, dataForUpdate, (err) => {

		if (err) {

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

		}

	});

	res.sendStatus(HttpStatus.ACCEPTED);

});
