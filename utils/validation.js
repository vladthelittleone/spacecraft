'use strict';

/**
 * @since 28.08.16
 * @author Aleksandrov Oleg
 */
var valid = require('validator');
var HttpError = require('error').HttpError;

var authHelp = {};

module.exports = authHelp;

// выполняем проверку логина и пароля
// параметры функции
// { email: мыло пользователя,
//   password: пароль пользователя,
// 	 emailNotCorrect: сообщение о ошибке если мыло не прошло валидацию,
// 	 passwordNotCorrect: сообщение об ошибке если пароль не прошел валидацию,
//   next: калбэк в который в который, если пользователь не верно указал логин или
// пароль будет переданно сообщени об ошибке}

authHelp.checkEmailAndPassword = function(res, req, next) {

	var email = res.body.email;
	var password = res.body.password;

	if (!email) {

		next(new HttpError(400, 'Вы забыли указать email.'));

	}

	if (!password) {

		next(new HttpError(400, 'Вы забыли указать пароль.'));

	}

	var normalizedEmail = valid.normalizeEmail(email).toString();

	if (!valid.isEmail(normalizedEmail)) {

		next(new HttpError(400, 'Некорректный email.'));

	}

	if (!valid.isLength(valid.trim(password), {min: 8})) {

		next(new HttpError(400, "Минимальная длина пароля 8 символов."));

	}

	next();
};
