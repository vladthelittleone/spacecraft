'use strict';

var angular = require('angular');
var lodash = require('lodash');

require('angular-ui-router');
require('angular-ui-layout');
require('angular-ui-ace');
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
		'spacecraft.modules'
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

	// Имя страницы, на которую ожидается переход.
	// Под именем понимается завершающее слово в url-пути.
	// Пример:
	// localhost/home/page/login
	// Именем в данном случае является: login.
	var transitionPage = '';

	var mainPage = 'welcome';
	var loginPage = 'login';

	/**
	 * При изменении текущей страницы - state, выполняется callback.
	 */

	$rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {

		if (!authentication.authenticated && lodash.has(toState, 'data.authorization') && lodash.has(toState, 'data.redirectTo')) {

			$state.go(toState.data.redirectTo);

		}

/*			if (transitionPage !== loginPage) {
			// Прерываем текущее событие перехода на страницу.
			event.preventDefault();

			// Запоминаем имя страницы перехода.
			transitionPage = toState.name;

			// Выполняем проверку авторизации пользователя
			authentication.isLoggedIn({

				// Если пользователь авторизован - осущ. переход.
				success: function () {

					if (transitionPage === loginPage) {

						// Если авторизованный пользователь пытался попасть
						// на страницу аутентификации - перебрасываем
						// его на главную страницу.
						$state.go(mainPage);

					}
					else {

						$urlRouterProvider.sync();

					}

				}

			});

		}
*/
	});

}
