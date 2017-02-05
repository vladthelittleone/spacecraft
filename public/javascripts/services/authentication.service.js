'use strict';

Authentication.$inject = ['connection',
						  'lessonService',
						  '$rootScope',
						  '$state',
						  '$q',
						  '$timeout'];

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
function Authentication(connection,
						lessonService,
						$rootScope,
						$state,
						$q,
						$timeout) {
	
	var that = {};
	
	// Флаг текущего статуса аутентификации пользователя.
	var authenticationStatus;
	
	that.login = login;
	that.logout = logout;
	that.currentUser = currentUser;
	that.register = register;
	that.getPromiseOfAuthenticationStatus = getPromiseOfAuthenticationStatus;
	
	/**
	 * Метод перенаправления пользователя на заданное состояние.
	 * Предполагается, что данный метод вызывается в рамках обработки
	 * логики отсутствия авторизации у пользователя.
	 */
	function routeToSpecifiedStateWhenUnauthorized() {
		
		$state.go('login');
		
	}
	
	/**
	 * Получить 'обещание' на текущий статус аутентификации.
	 * Метод гарантирует, что в качестве подтверждения успешной аутентификации
	 * будет вызван errorCallback promise'a и в обратном случае - errorCallback.
	 * @returns {*}
	 */
	function getPromiseOfAuthenticationStatus() {
		
		var deferred = $q.defer();
		
		deferGettingAuthenticationStatus(deferred);
		
		return deferred.promise;
		
	}
	
	/**
	 * Функция осуществления отложенного процесса получения состояния аутентификации.
	 * @param deferred - предполагается, что объект отложенного задания (объект полученный на выходе $q.deffer()).
	 */
	function deferGettingAuthenticationStatus(deferred) {
		
		if (lodash.isNil(authenticationStatus)) {
			
			connection.checkSession(function () {
				
										processingSuccessfulAuthorization();
				
										deferred.resolve(authenticationStatus);
				
									},
									function () {
				
										processingFailedAuthorization();
				
										routeToSpecifiedStateWhenUnauthorized();
				
										deferred.reject(authenticationStatus);
				
									});
		} else {
			
			// Имитируем асинхронную обработку deferred.
			$timeout(function () {
				
				if (!authenticationStatus) {
					
					routeToSpecifiedStateWhenUnauthorized();
					
					deferred.reject(authenticationStatus);
					
					return;
					
				}
				
				deferred.resolve(authenticationStatus);
				
			}, 0, false);
			
		}
		
	}
	
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
	
	return that;
	
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
		
		connection.getUserInfo(function (res) {
			
			callback(res.data);
			
		});
		
	}
}
