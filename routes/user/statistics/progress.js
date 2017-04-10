'use strict';

/**
 * @since 16.02.17
 * @author greezlock
 */

/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');

const Statistic = require('./../../../models/statistic');
const checkAuthentication = require('./../../../middlewares/check-authentication');

const lodash = require('lodash');

const router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

router.get('/user/statistics/progress', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;

	Statistic.getUserStatistics(idUser, (error, result) => {

		if (error) {

			return next(error)
		}

		let userProgress = [];

		// Если что-то есть в базе
		if (result && result.userProgress) {

			userProgress = result.userProgress;

		}

		res.send(userProgress);

	})

});

/**
 * ------------------------------------------------
 * POST
 * ------------------------------------------------
 */

router.post('/user/statistics/progress', checkAuthentication, (req, res, next) => {

	let idUser = req.user._id;
	let scoreFromRequest = req.body.score;

	// Если очки действительно пришли
	if (scoreFromRequest) {

		// Кладем обновленный прогресс пользователя
		Statistic.updateUserProgress(idUser, scoreFromRequest, (error, result) => {

			if (error) {

				return next(new HttpError(400, "Ошибка сохранения очков пользователя"));

			}

			// Отправляем в ответ обновленный массив очков
			res.send(result.userProgress);

		});
	}

});
