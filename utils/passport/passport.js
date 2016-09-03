'use strict';

var User = require ('models/user').User;

module.exports = function (passport) {

	// passport используя куки может опознать пользователя, и достать его данные из сессии.
	// Для того, чтобы сохранять или доставать пользовательские данные из сессии, 
	// паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`. 
	
	// серилизация сессии пользователя.
	passport.serializeUser (function (user, next) {

		next (null, user._id);

	});

	// десерилизация сессии пользователя
	passport.deserializeUser (function (id, next) {

		User.findById (id, function (err, user) {

			next (err, user);

		});

	});

};
