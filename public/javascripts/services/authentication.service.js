'use strict';

Authentication.$inject = ['$rootScope',
						  '$state',
						  '$timeout',
						  'connection',
						  'lessonService',
						  'statisticsStorage'];

module.exports = Authentication;

// Для управления состоянием хранилища.
var storage = require('./../utils/storage')();
var lodash = require('lodash');

/**
 * Сервис аутентификации.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function Authentication($rootScope,
						$state,
						$timeout,
						connection,
						lessonService,
						statisticsStorage) {
	
	// Попдписываемся на событие запроса аутентификации сервером(сервер вернул 401).
	$rootScope.$on('event:auth-loginRequired', function () {
		
		onAuthorizationFail();
		
		routeToSpecifiedStateWhenUnauthorized();
		
	});
	
	// Подписываемся на событие логаута пользователем.
	$rootScope.$on('event:auth-loginCancelled', function () {
		
		onLogout();
		
		routeToSpecifiedStateWhenUnauthorized();
		
	});
	
	var that = {};
	
	// Флаг текущего статуса аутентификации пользователя.
	var authenticationStatus;
	
	that.login = login;
	
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
			
			onAuthorizationSuccess();
			
			resolve(authenticationStatus);
		}
		
	}
	
	/**
	 * Метод введен для "причесывания" места, в котором тело текущего
	 * метода определялось явно, в виде анонимной функции.
	 */
	function processingFailedCheckSession(reject) {
		
		return function () {
			
			onAuthorizationFail();
			
			reject(authenticationStatus);
			
		}
		
	}
	
	/**
	 * Взятие статуса аутентификации - строго асинхронная функция.
	 * На вход она получает методы resolve и reject какого-то отложенного задания (это есть вызов $q(function)),
	 * которое было оформлено на выполнение этого метода.
	 * @param ignoreAuthModule флаг игнорирования angular-http-auth модуля (он не будет обрабатывать 401 код
	 *                         при проверке сессии);
	 * @param resolve вызывается, как факт успешного разрешения задания.
	 * @param reject вызывается, как факт неуспешного разрешения задания.
	 */
	function getAuthenticationStatus(ignoreAuthModule, resolve, reject) {
		
		// Если authenticationStatus не определен или false, значит
		// нужно идти к серверу за состоянием активности текущей сессии.
		// В противном случае, в authenticationStatus ВСЕГДА находится
		// флаг актуальности текущей сессии.
		if (!authenticationStatus) {
			
			connection.checkSession(ignoreAuthModule,
									processingSuccessfulCheckSession(resolve),
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
		
		// Если мы уже НЕ на логине (проверка, дабы случайно не попасть на рекурсию);
		$state.current.name !== 'login' && $state.go('login');
		
	}
	
	function onAuthorizationSuccess() {
		
		authenticationStatus = true;
		
	}

	function onLogout() {

		// Очищаем сервис урока, так как его состояние больше
		// не является актуальным после логаута.
		lessonService.clear();

		// Очищаем хранилище статистики для последнего пользователя.
		statisticsStorage.clear();

		// Если storage поддерживается текущей реализацией браузера.
		// В противном случае заботиться о очистке не нужно :)
		storage.local && storage.local.clear();

		authenticationStatus = false;
		
	}

	/**
	 * Обработка ситуации потери пользователем права на авторизацию.
	 */
	function onAuthorizationFail() {
		
		authenticationStatus = false;
	}
	
	/**
	 * Метод входа в систему.
	 */
	function login(args) {
		
		connection.login({
							 email:    args.email,
							 password: args.password
						 },
						 args.success,
						 args.error);
		
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
		
		connection.getUserInfo(function (res) {
			
			callback(res.data);
			
		});
		
	}
	
}
