'use strict';

var angular = require('angular');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-chart.js');
require('angular-ui-ace');
require('./modules');

/**
 * @description Главный модуль angularJS,
 * описывающий все модули.
 */
angular.module('spacecraft', [
		'chart.js',
		'ui.router',
		'ui.ace',
		'ui.layout',
		'spacecraft.game.module'
	])
	.config(configBlock)
	.run(runBlock);

/**
 * Загружаем директивы, сервисы, контроллеры.
 */
require('./services');
require('./directives');

angular.module('spacecraft').config(configBlock);
angular.module('spacecraft').run(runBlock);

runBlock.$inject = ['authentication', '$rootScope', '$state'];
configBlock.$inject = ['$urlRouterProvider', 'ChartJsProvider'];

/**
 * Конфигурация сервисов до старта приложения.
 */
function configBlock($urlRouterProvider, ChartJsProvider) {

	// Для всех необработанных переходов
	$urlRouterProvider.otherwise('/');

	// Настройка всех графиков
	ChartJsProvider.setOptions({
		colours:    ['#152B39', '#C5C8C6'],
		responsive: true
	});

	// Конфигурация графиков линейных
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});

}

/**
 * Запуск скрипта на старте приложения.
 */
function runBlock(authentication, $rootScope, $state) {

	/**
	 * При изменении текущей страницы - state, выполняется callback.
	 */
	$rootScope.$on('$stateChangeSuccess', function () {

		// Текущая страница
		var current = $state.current.name;

		// Если текущая страница не ввода логина
		if (current !== 'login') {

			// Выполняем проверку авторизации пользователя
			authentication.isLoggedIn({

				error: function () {

					// В случае ошибки переходим на страницу логина.
					$state.go('login');

				}

			});

		}

	});

}
