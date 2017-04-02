'use strict';

/**
 * Методы:
 * - авторизация;
 * - регистрация;
 * - выход;
 *
 * Все эти методы, связанные с доступом к сервису, были вынесены в этот отдельный
 * модуль.
 * @since 16.02.17
 * @author greezlock
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

var HttpStatus = require('http-status-codes');

const checkAuthentication = require('./../middlewares/check-authentication');

const emailExistence = require('email-existence');

const logger = require('./../utils/log')(module);

var validation = require('./../utils/validation');

var strategyHelp = require('./strategy.help');

module.exports = router;

/**
 * ------------------------------------------------------------
 * АВТОРИЗАЦИЯ
 * ------------------------------------------------------------
 */
router.get('/vk', passport.authenticate('vk-login'));

router.get('/vk/callback', passport.authenticate('vk-login', {

	successRedirect: '/'

}));

router.post("/login", validation.checkEmailAndPassword, passport.authenticate('local-login'));

/**
 * ------------------------------------------------------------
 * ВЫХОД
 * ------------------------------------------------------------
 */
router.post('/logout', checkAuthentication, (req, res, next) => {

	req.logout();

	res.sendStatus(HttpStatus.OK);

});

/**
 * ------------------------------------------------------------
 * РЕГИСТРАЦИЯ
 * ------------------------------------------------------------
 */
router.post('/register', validation.checkEmailAndPassword, (req, res, next) => {

	let email = req.body.email;
	let password = req.body.password;
	let isSubscribeOnEmail = req.body.isSubscribeOnEmail;

	let normalizeEmail = valid.normalizeEmail(email);

	emailExistence.check(normalizeEmail, function (error, result, undetermined) {

		// 3-им параметром для коллбэка либа emailExistence предоставляет статус неопределенности.
		// Если он определен, значит произошла ошибка связанная с больше с техничесокой составляющей:
		// - timeout по подключению; неопределенный ответ от SMTP сервера или DNS;
		// В общем случае, это повод ответит статусом 500 и тем самым попросить пользователя повторить
		// запрос позже.
		if (undetermined) {

			logger.error(error);

			return next(HttpStatus.INTERNAL_SERVER_ERROR);

		}

		if (!result) {

			logger.warn('email does not exist: ', normalizeEmail);

			return next(new HttpError(HttpStatus.UNPROCESSABLE_ENTITY, "Такой email не существует :)"));

		}

		User.registration(normalizeEmail, password, isSubscribeOnEmail, (err, user) => {

			if (err) {

				next(err);

			}

			// Нет необходимости привязывать обработку отправки письма к процессу регистрации.
			// Вполне себе отдельная асинхронная операция.
			// В противном случае - должна появиться логика отмены вставки документа user в коллекцию users.
			emailConfirmation.send(user, function(error) {

				if (error) {

					logger.error(error);

				}

			});

			strategyHelp.updateTotalFinalScore(user);

			return res.sendStatus(HttpStatus.OK);

		});

	});

});
