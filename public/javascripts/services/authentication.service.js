'use strict';

Authentication.$inject = ['connection', 'lessonService', '$rootScope', '$cookies', '$state'];

module.exports = Authentication;

// Для управления состоянием хранилища.
var storage = require('./../utils/storage')();

/**
 * Сервис аутентификации.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function Authentication(connection, lessonService, $rootScope, $cookies, $state) {

	var that = {};

	// Если в куках есть сессия - считаем, что пользователь авторизован.
	that.isAuthenticated = $cookies.get('sid');

	that.login = login;
	that.logout = logout;
	that.currentUser = currentUser;
	that.register = register;

	// Подписываемся на событие успешной аутентификации на сервере.
	$rootScope.$on('event:auth-loginConfirmed', function() {

		that.isAuthenticated = true;

		// Переход на главную страницу после аутентификации.
		$state.go('welcome');

	});

	// Попдписываемся на событие запроса аутентификации сервером(сервер вернул 401).
	$rootScope.$on('event:auth-loginRequired', function() {

		processingUnauthorized();

	});

	// Подписываемся на событие логаута пользователем.
	$rootScope.$on('event:auth-loginCancelled', function() {

		processingUnauthorized();

	});

	return that;

	/**
	 * Обработка ситуации потери пользователем права на авторизацию.
	 */
	function processingUnauthorized() {

		// Очищаем сервис урока, так как его состояние больше
		// не является актуальным в момент редиректа на страницу логина.
		lessonService.clear();

		// Если storage поддерживается текущей реализацией браузера.
		// В противном случае заботиться о очистке не нужно :)
		storage.local && storage.local.clear();

		// Удаляем сессию из кук.
		$cookies.remove('sid');

		that.isAuthenticated = false;

		$state.go('login');

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
	 * Текущий пользователь и инфомрация о нем.
	 *
	 * @param callback
	 */
	function currentUser(callback) {

		connection.getUserInfo(function(res){

			callback(res.data);

		});

	}
}
