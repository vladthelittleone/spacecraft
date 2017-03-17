'use strict';

/**
 * @since 28.08.16
 * @author Aleksandrov Oleg
 */
var valid = require('validator');
var HttpError = require('error').HttpError;

module.exports = Validation();


function Validation() {

	let that = {};

	that.checkEmailAndPassword = checkEmailAndPassword;

	return that;

	/**
	 * выполняем проверку логина и пароля
	 * параметры функции
	 * { email: мыло пользователя,
     *	 password: пароль пользователя,
     *	 emailNotCorrect: сообщение о ошибке если мыло не прошло валидацию,
     *	 passwordNotCorrect: сообщение об ошибке если пароль не прошел валидацию,
     *	 next: калбэк в который в который, если пользователь не верно указал логин или
     * пароль будет переданно сообщени об ошибке}
	 */

	function checkEmailAndPassword(res, req, next) {

		let email = res.body.email;
		let password = res.body.password;

		if (!email) {

			return next(new HttpError(400, 'Вы забыли указать email.'));

		}

		if (!password) {

			return next(new HttpError(400, 'Вы забыли указать пароль.'));

		}

		var normalizedEmail = valid.normalizeEmail(email).toString();

		if (!valid.isEmail(normalizedEmail)) {

			return next(new HttpError(400, 'Некорректный email.'));

		}

		if (!valid.isLength(valid.trim(password), {min: 8})) {

			return next(new HttpError(400, "Минимальная длина пароля 8 символов."));

		}

		next();
	}

}
