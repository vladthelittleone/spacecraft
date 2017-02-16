/**
 * @since 16.02.17
 * @author greezlock
 */

/**
 * @since 16.02.17
 * @author greezlock
 */

var express = require('express');

var Statistic = require('./../../../models/statistic').Statistic;
const checkAuthentication = require('./../../../middlewares/check-authentication');

var lodash = require('lodash');

var router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * GET
 * ------------------------------------------------
 */

router.get('/', checkAuthentication, (req, res, next) => {

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

router.post('/', checkAuthentication, (req, res, next) => {

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
