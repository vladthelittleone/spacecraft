'use strict';

Authentication.$inject = ['connection',
						  'lessonService',
						  '$rootScope',
						  '$state',
						  '$q',
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
						$q,
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
	that.logout = logout;
	
	that.currentUser = currentUser;
	
	that.register = register;
	
	that.getPromiseOfAuthenticationStatus = getPromiseOfAuthenticationStatus;
	
	return that;
	
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
	 * будет вызван successCallback promise'a и в обратном случае - errorCallback.
	 */
	function getPromiseOfAuthenticationStatus() {
		
		var deferred = $q.defer();
		
		deferGettingAuthenticationStatus(deferred);
		
		return deferred.promise;
		
	}
	
	/**
	 * Обработка отложенного задания по успешному получению
	 * статуса аутентификации.
	 *
	 * Метод введен для "причесывания" места, в котором тело текущего
	 * метода определялось явно, в виде анонимной функции.
	 */
	function processingDeferredOnSuccessful(deferred) {
		
		return function () {
			
			processingSuccessfulAuthorization();
			
			deferred.resolve(authenticationStatus);
		}
		
	}
	
	/**
	 * Обработка отложенного задания по неудачному получению
	 * статуса аутентификации.
	 *
	 * Метод введен для "причесывания" места, в котором тело текущего
	 * метода определялось явно, в виде анонимной функции.
	 */
	function processingDeferredOnFailed(deferred) {
		
		return function () {
			
			processingFailedAuthorization();
			
			routeToSpecifiedStateWhenUnauthorized();
			
			deferred.reject(authenticationStatus);
			
		}
		
	}
	
	
	/**
	 * Функция осуществления отложенного процесса получения состояния аутентификации.
	 * @param deferred - предполагается, что объект отложенного задания (объект полученный на выходе $q.deffer()).
	 */
	function deferGettingAuthenticationStatus(deferred) {
		
		if (lodash.isNil(authenticationStatus)) {
			
			connection.checkSession(processingDeferredOnSuccessful(deferred),
									processingDeferredOnFailed(deferred));
			
		} else {
			
			// Имитируем асинхронную обработку deferred.
			$timeout(function () {
				
				if (authenticationStatus) {
					
					deferred.resolve(authenticationStatus);
					
					return;
					
				}
				
				routeToSpecifiedStateWhenUnauthorized();
				
				deferred.reject(authenticationStatus);
				
				
			}, 0, false);
			
		}
		
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
				   errorCallback) {
		
		// TODO имеет смысл ввести вещание сигналов по событиям,
		// связанных с ошибочными ситуация при логине.
		connection.login({
							 email:    email,
							 password: password
						 },
						 authService.loginConfirmed,
						 errorCallback);
		
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
