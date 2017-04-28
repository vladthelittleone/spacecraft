'use strict';

var passport = require('passport');

var HttpStatus = require('http-status-codes');

var sessions = require('./../../models/sessions');
var userHelper = require('./../helpers/authentication/user');

module.exports = () => {

	/**
	 * Сериализация сессии.
	 */
	passport.serializeUser((user, next) => {

		sessions.removeAllByUserId(user._id, function (error) {

			if (error) {

				return next(HttpStatus.INTERNAL_SERVER_ERROR);

			}

			next(null, user._id);

		});

	});

	/**
	 * Десериализация сессии.
	 */
	passport.deserializeUser(userHelper.prepareUserObjectForSession);

};
