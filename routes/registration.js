/**
 * @since 02.03.16
 * @author Skurishin Vladislav
 */

var express = require('express');
var valid = require('validator');
var router = express.Router();

var Statistic = require('models/statistic').Statistic;

const logger = require('utils/log')(module);


var User = require('models/user').User;
var AuthError = require('error').AuthError;
var HttpError = require('error').HttpError;

function isEmail(email) {

	if (!email) {

		return false;

	}

	return valid.isEmail(email);

}

function isPassword(password) {

	if (!password) {

		return false;

	}

	return valid.isLength(valid.trim(password), {min: 8});

}

router.post('/', function (req, res, next) {

	var email = req.body.email;
	var password = req.body.password;
	var isSubscribeOnEmail = req.body.isSubscribeOnEmail;

	if (!isEmail(email)) {

		return next(new HttpError(400, 'Некорректный email'));

	}

	if (!isPassword(password)) {

		return next(new HttpError(400, 'Длина пароля слишком мала'));

	}

	var normalizeEmail = valid.normalizeEmail(email);

	User.registration(normalizeEmail, password, isSubscribeOnEmail, function (err, user) {

		if (err) {

			if (err instanceof AuthError) {

				return next(new HttpError(409, err.message));

			} else {

				return next(err);

			}
		}

		let userId = user._doc._id;
		let initTotalFinalScore = 0;

		// Регистрируем пользователя в статистике с начальной историей прохождения уроков.
		Statistic.updateTotalFinalScore(userId, initTotalFinalScore, function (error, data) {

			// Если произошла ошибка в процессе сохранения статистики, достаточно лишь
			// отписать об этом в лог.
			// На сам процесс регистрации это никак не повлияет, так что спокойно отвечаем
			// пользователю, даже при ошибке.
			if (error) {

				logger.info('some problem with save of statistics for the new registered user: ',
					        error);

			}

			res.send({email: normalizeEmail});

		});

	});

});

module.exports = router;
