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
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const validator = require('validator');
const async = require('async');

const checkAuthentication = require('./../middlewares/check-authentication');
const logger = require('./../utils/log')(module);
const validatorHelper = require('./../utils/helpers/validator.helper');
const emailConfirmationHelper = require('./../utils/helpers/authentication/email.confirmation');
const userHelper = require('./../utils/helpers/authentication/user');
const UserModel = require('../models/user');
const config = require('../config');
const settings = config.get('serverSettings').authentication;

const router = express.Router();
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
	let subscriptionToMailingFlag = req.body.subscriptionToMailingFlag;

	let normalEmail = validator.normalizeEmail(email);

	async.waterfall([
						// Проверка почты на существование.
						async.apply(checkEmailForExistance, normalEmail),
						// Регистрация пользователя.
						callback => UserModel.registration(normalEmail,
														   password,
														   subscriptionToMailingFlag,
														   callback),
						// Отправляем пользователяя подтверждение почты.
						async.apply(sendEmailConfirmationAfterRegistration)
					],
					(error) => {

						if (error) {

							logger.error(error);

							return next(error);

						}

						return res.sendStatus(HttpStatus.OK);

					});

});

function checkEmailForExistance(email, callback) {

	if (settings.checkEmailForExistenceFlag) {

		return emailConfirmationHelper.checkEmailForExistence(email, callback);

	}

	callback(null);

}

function sendEmailConfirmationAfterRegistration(user, callback) {

	// Инициализация поля totalFinalScore у вновь зарегистрированного пользователя.
	userHelper.initTotalFinalScore(user);

	if (settings.sendingOfEmailConfirmationFlag) {

		return emailConfirmationHelper.sendEmailConfirmation(user, callback);

	}

	callback(null);


}
