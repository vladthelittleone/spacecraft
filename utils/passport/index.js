'use strict';

var passport = require('passport');

var HttpStatus = require('http-status-codes');

var sessions = require('./../../models/sessions');

module.exports = () => {

	/**
	 * passport используя куки может опознать пользователя, и достать его данные из сессии.
	 * Для того, чтобы сохранять или доставать пользовательские данные из сессии,
	 * паспорт использует функции #serializeUser() и #deserializeUser().
	 *
	 * серилизация сессии пользователя.
	 */
	passport.serializeUser ((user, next) => {

		sessions.removeAllByUserId(user._id, function(error){

			if (error) {

				return next(HttpStatus.INTERNAL_SERVER_ERROR);

			}

			next(null, user);

		});

	});

	/**
	 * десерилизация сессии пользователя
	 * если потребуеться как то обновлять данные пользователя
	 * то необходимо переписать сию функцию, скорей всего придеться
	 * лезть в базу
	 */
	passport.deserializeUser ((user, next) => {

		next (null, user);

	});

};
