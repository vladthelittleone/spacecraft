'use strict';

var User = require('../../models/user');
var LocalStrategy = require('passport-local').Strategy;
var valid = require('validator');
var strategyHelp = require('./strategy.help');

// TODO исключить верхний valid. Он не нужен.
var validation = require('../validation');

var HttpError = require('error').HttpError;

const emailConfirmation = require('./../email/confirmation/email.confirmation');

const emailExistence = require('email-existence');

const logger = require('./../../utils/log')(module);

var local = {};

var HttpStatus = require('http-status-codes');

module.exports = local;

/**
 * имена полей в которых приходят мыло и пароль
 */
var localStrategyReqParam = {

	usernameField:     'email',
	passwordField:     'password',
	passReqToCallback: true

};

/**
 * Локальная стратегия для авторизации.
 */
local.login = new LocalStrategy(localStrategyReqParam, (req, email, password, next) => {

	let normalizeEmail = valid.normalizeEmail(email);

	User.authorize(normalizeEmail, password, (err, user) => {

		next(err, user);

	});

});

/**
 * Локальная стратегия для регистрации пользователя.
 * Особенность этой стратегии заключается в том, что необходимо отправить
 * пользователю (на его email) сообщение о подтверждении почты.
 */
local.registration = new LocalStrategy(localStrategyReqParam, (req, email, password, next) => {

	let normalizeEmail = valid.normalizeEmail(email);
	let isSubscribeOnEmail = req.body.isSubscribeOnEmail;

	emailExistence.check(normalizeEmail, function (error, result) {

		// TODO анализировать error, дабы все-таки корректно отвечать.
		// emailExistence пакует в error.code значение ENOTFOUND или ENODATA в случае,
		// если host почтового сервиса не найден.
		if (error) {

			logger.error(error);

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR);

		}

		if (!result) {

			logger.warn('email does not exist: ', normalizeEmail);

			return next(new HttpError(HttpStatus.UNPROCESSABLE_ENTITY, "Такой email не существует :)"));

		}

		User.registration(normalizeEmail, password, isSubscribeOnEmail, (err, user) => {

			if (err) {

				return next(err, email);

			}

			// TODO если письмо не было отправлено, можно просить пользователя попросить зарегистрироваться еще раз.
			// TODO вообще отловом таких ситуаций, можно сразу отсекать юзеров с левыми адресами. (remove у user тогда не забывать делать).
			emailConfirmation.send(user);

			strategyHelp.updateTotalFinalScore(user);

			next(null, user);

		});

	});

});
