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

const express = require('express');
const router = express.Router();
const passport = require('passport');

const HttpStatus = require('http-status-codes');

const checkAuthentication = require('./../middlewares/check-authentication');

const logger = require('./../utils/log')(module);

const validatorHelper = require('./../utils/helpers/validator.helper');

const validator = require('validator');

const async = require('async');

const authenticationHelper = require('./../utils/helpers/authentication.helper');

const UserModel = require('../models/user');

const config = require('../config');

const settings = config.get('serverSettings').authentication;

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

router.post("/login", validatorHelper.checkEmailAndPassword, passport.authenticate('local-login'));

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
router.post('/register', validatorHelper.checkEmailAndPassword, (req, res, next) => {

	let email = req.body.email;
	let password = req.body.password;
	let flagOfSubscriptionToMailing = req.body.flagOfSubscriptionToMailing;

	let normalEmail = validator.normalizeEmail(email);

	async.waterfall([
						// Проверка почты на существование.
						function (callback) {

							if (settings.checkEmailForExistenceFlag) {

								return authenticationHelper.checkEmailForExistence(normalEmail, callback);

							}

							callback(null);

						},

						// Регистрация пользователя.
						function (callback) {

							UserModel.registration(normalEmail,
												   password,
												   flagOfSubscriptionToMailing,
												   callback);

						},

						// Инициализация поля totalFinalScore у вновь зарегистрированного пользователя.
						// Отправка письма с просьбой подтвердить почту.
						function (user, callback) {

							// TODO а зачем так явно инициализировать totalFinalScore?
							authenticationHelper.initTotalFinalScore(user);

							if (settings.sendingOfEmailConfirmationFlag) {

								return authenticationHelper.sendEmailConfirmation(user, callback);

							}

							callback(null);


						}
					],
					function (error) {

						if (error) {

							logger.error(error);

							return next(HttpStatus.INTERNAL_SERVER_ERROR);

						}

						return res.sendStatus(HttpStatus.OK);

					});

});
