'use strict';

var angular = require('angular');
var lodash = require('lodash');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');
require('angular-http-auth');
require('angular-cookies');
require('angular-messages');
require('angular-ui-bootstrap');
require('angular-spinner');

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
		'ui.bootstrap',
		'spacecraft.modules',
		'http-auth-interceptor',
		'ngCookies',
		'ngMessages',
		'angularSpinner'
	])
	.config(configBlock)
	.run(runBlock);


/**
 * Загружаем директивы, сервисы.
 */
require('./services');
require('./directives');

runBlock.$inject = ['authentication', '$rootScope', '$state'];
configBlock.$inject = ['$urlRouterProvider', '$locationProvider', 'usSpinnerConfigProvider'];

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, $locationProvider, usSpinnerConfigProvider) {

	// Включаем адреса без решетки (#).
	$locationProvider.html5Mode({

									enabled:      true,
									rewriteLinks: false

								});

	usSpinnerConfigProvider.setTheme('loginTheme', {color: 'white'});

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock(authentication, $rootScope, $state) {

	// Оставим определение метода пустым на случай необходимости.

}
