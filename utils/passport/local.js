'use strict';

var User = require('../../models/user');
var LocalStrategy = require('passport-local').Strategy;

var validator = require('validator');

var local = {};

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

	let normalizeEmail = validator.normalizeEmail(email);

	User.authorize(normalizeEmail, password, (err, user) => {

		next(err, user);

	});

});
