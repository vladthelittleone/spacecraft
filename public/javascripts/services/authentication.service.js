'use strict';

Authentication.$inject = ['connection',
						  'lessonService',
						  '$rootScope',
						  '$state',
						  '$timeout',
						  'authService'];

module.exports = Authentication;

// Для управления состоянием хранилища.
var storage = require('./../utils/storage')();
var lodash = require('lodash');

/**
 * Сервис аутентификации.
 *
 * authService - сторонний сервис, реализует логику отлова 401 кода в ответах от сервера.
 * В данном сервисе он необходим, для регистрации обработчиков, на случай возникновения ответа
 * с этим кодом.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function Authentication(connection,
						lessonService,
						$rootScope,
						$state,
						$timeout,
						authService) {

	// Подписываемся на событие успешной аутентификации на сервере.
	$rootScope.$on('event:auth-loginConfirmed', function () {

		processingSuccessfulAuthorization();

		// Переход на главную страницу после аутентификации.
		$state.go('welcome');

	});

	// Попдписываемся на событие запроса аутентификации сервером(сервер вернул 401).
	$rootScope.$on('event:auth-loginRequired', function () {

		processingFailedAuthorization();

		routeToSpecifiedStateWhenUnauthorized();

	});

	// Подписываемся на событие логаута пользователем.
	$rootScope.$on('event:auth-loginCancelled', function () {

		processingFailedAuthorization();

		routeToSpecifiedStateWhenUnauthorized();

	});

	var that = {};

	// Флаг текущего статуса аутентификации пользователя.
	var authenticationStatus;

	that.login = login;

	that.loginByVK = loginByVK;

	that.logout = logout;

	that.currentUser = currentUser;

	that.register = register;

	that.getAuthenticationStatus = getAuthenticationStatus;

	return that;

	/**
	 * Метод введен для "причесывания" места, в котором тело текущего
	 * метода определялось явно, в виде анонимной функции.
	 */
	function processingSuccessfulCheckSession(resolve) {

		return function () {

			processingSuccessfulAuthorization();

			resolve(authenticationStatus);
		}

	}

	/**
	 * Метод введен для "причесывания" места, в котором тело текущего
	 * метода определялось явно, в виде анонимной функции.
	 */
	function processingFailedCheckSession(reject) {

		return function () {

			processingFailedAuthorization();

			routeToSpecifiedStateWhenUnauthorized();

			reject(authenticationStatus);

		}

	}

	/**
	 * Взятие статуса аутентификации - строго асинхронная функция.
	 * На вход она получает методы resolve и reject какого-то отложенного задания (это есть вызов $q(function)),
	 * которое было оформлено на выполнение этого метода.
	 * @param resolve вызывается, как факт успешного разрешения задания.
	 * @param reject вызывается, как факт неуспешного разрешения задания.
	 */
	function getAuthenticationStatus(resolve, reject) {

		// Если authenticationStatus не определен, значит
		// нужно идти к серверу за состоянием активности текущей сессии.
		// В противном случае, в authenticationStatus ВСЕГДА находится
		// флаг актуальности текущей сессии.
		if (lodash.isNil(authenticationStatus)) {

			connection.checkSession(processingSuccessfulCheckSession(resolve),
									processingFailedCheckSession(reject));

		} else {

			// Имитируем асинхронную обработку, так как на вход нам были поданы
			// resolve и reject отложенного задания.
			$timeout(function () {

				if (authenticationStatus) {

					resolve(authenticationStatus);

					return;

				}

				routeToSpecifiedStateWhenUnauthorized();

				reject(authenticationStatus);


			}, 0, false);

		}

	}

	/**
	 * Метод перенаправления пользователя на заданное состояние.
	 * Предполагается, что данный метод вызывается в рамках обработки
	 * логики отсутствия авторизации у пользователя.
	 */
	function routeToSpecifiedStateWhenUnauthorized() {

		$state.go('login');

	}

	function processingSuccessfulAuthorization() {

		authenticationStatus = true;

	}

	/**
	 * Обработка ситуации потери пользователем права на авторизацию.
	 */
	function processingFailedAuthorization() {

		// Очищаем сервис урока, так как его состояние больше
		// не является актуальным в момент редиректа на страницу логина.
		lessonService.clear();

		// Если storage поддерживается текущей реализацией браузера.
		// В противном случае заботиться о очистке не нужно :)
		storage.local && storage.local.clear();

		authenticationStatus = false;
	}

	/**
	 * Метод входа в систему.
	 * Позволяет предоставить callback для обработки ошибочной ситуации,
	 * касающейся именно контекста АВТОРИЗАЦИИ (log in) в системе.
	 *
	 * @param errorCallback коллбек ошибочного выполнения запроса
	 * @param email идентификатор
	 * @param password пароль
	 */
	function login(email,
				   password,
				   error) {

		connection.sigIn({
							 email:    email,
							 password: password
						 },
						 authService.loginConfirmed,
						 error);

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

	function loginByVK() {

		connection.sigIn({
							 email:    email,
							 password: password
						 },
						 authService.loginConfirmed,
						 error);
		connection.loginByVK(authService.loginConfirmed,
		error)

	}

	/**
	 * Текущий пользователь и инфомрация о нем.
	 *
	 * @param callback
	 */
	function currentUser(callback) {

		connection.getUserInfo(function (res) {

			callback(res.data);

		});

	}

}
