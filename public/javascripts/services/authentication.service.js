'use strict';

Authentication.$inject = ['connection', '$state'];

module.exports = Authentication;

/**
 * Сервис аутентификации.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function Authentication(connection, $state) {

	var that = {};

	var authenticated = false;

	that.authenticated = authenticated;
	that.go = go;
	that.clear = clear;
	that.login = login;
	that.logout = logout;
	that.isLoggedIn = isLoggedIn;
	that.currentUser = currentUser;
	that.register = register;

	return that;


	function clear()  {

		authenticated = false;

	}


	function go(fallback) {

		isLoggedIn({

			success: function () {

				authenticated = true;

				$state.go(fallback);

			}

		});

	}

	/**
	 * Метод входа в систему.
	 *
	 * @param args.success коллбек успешного выполнения запроса
	 * @param args.error коллбек ошибочного выполнения запроса
	 * @param args.email идентификатор
	 * @param args.password пароль
	 */
	function login(args) {

		connection.login(args);

	}

	/**
	 * Метод выхода из системы.
	 *
	 * @param args.success коллбек успешного выполнения запроса
	 * @param args.error коллбек ошибочного выполнения запроса
	 */
	function logout(args) {

		var success = args.success;
		var error = args.error;

		connection.logout(success, error);

	}

	/**
	 * Метод регистрации в системе.
	 *
	 * @param args.success коллбек успешного выполнения запроса
	 * @param args.error коллбек ошибочного выполнения запроса
	 * @param args.email мэйл
	 * @param args.password пароль
	 */
	function register(args) {

		connection.register(args);

	}

	/**
	 * Проверка авторизации пользователя.
	 *
	 * @param args.success коллбек успешного выполнения запроса
	 * @param args.error коллбек ошибочного выполнения запроса
	 */
	function isLoggedIn(args) {

		connection.isLoggedIn(args);

	}

	/**
	 * Текущий пользователь и инфомрация о нем.
	 *
	 * @param callback
	 */
	function currentUser(callback) {

		isLoggedIn({

			success: function (res) {

				callback(res.data);

			}

		})

	}
}
