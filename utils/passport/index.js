'use strict';

module.exports = function (passport) {

	// passport используя куки может опознать пользователя, и достать его данные из сессии.
	// Для того, чтобы сохранять или доставать пользовательские данные из сессии,
	// паспорт использует функции #serializeUser() и #deserializeUser().

	// серилизация сессии пользователя.
	passport.serializeUser (function (user, next) {

		next (null, user);

	});

	// десерилизация сессии пользователя
	// если потребуеться как то обновлять данные пользователя
	// то необходимо переписать сию функцию, скорей всего придеться
	// лезть в базу
	passport.deserializeUser (function (user, next) {

		 next (null, user);

	});

};
