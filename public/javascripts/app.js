'use strict';

var angular = require('angular');
var lodash = require('lodash');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');
require('angular-http-auth');
require('angular-cookies');

/**
 * Подключаем изменение прототипа.
 */
require('./extends');

/**
 * Загружаем модули.
 */
require('./modules');

/**
 * @description Главный модуль angularJS,
 * описывающий все модули.
 */
angular.module('spacecraft', [
		'ui.router',
		'ui.ace',
		'ui.layout',
		'spacecraft.modules',
		'http-auth-interceptor',
		'ngCookies'
	])
	.config(configBlock)
	.run(runBlock);

/**
 * Загружаем директивы, сервисы.
 */
require('./services');
require('./directives');

runBlock.$inject = ['authentication', '$rootScope', '$state'];
configBlock.$inject = ['$urlRouterProvider', 'ChartJsProvider'];

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, ChartJsProvider) {

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock(authentication, $rootScope, $state) {

	var LOGIN_STATE = 'login';

	$rootScope.$on("$stateChangeStart", function(event, toState) {

		// Если мы не авторизованы и отсутствуют куки.
		if (!authentication.isAuthenticated && toState.name != LOGIN_STATE) {

			// Отменяем маршрутизацию.
			event.preventDefault();

			$state.go(LOGIN_STATE);

		}

	});

}
