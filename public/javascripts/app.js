'use strict';

var angular = require('angular');

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
 * Загружаем "оповещатели" (эмиттеры) событий.
 */
require( './emitters' );

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

	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

		// Пояснения к условиям:
		// 1. toState.name !== transitionPage страница, на которую сейчас желает произвести
		// переход ui-router, не является страницей, которую мы ожидаем в качестве перехода.
		var isItNewPageForTransition = toState.name !== transitionPage;

		// Если страница, на которую в данный момент осуществляется переход, новая,
		// значит необходимо произвести проверку авторизации пользователя на сервере.
		// В противном случае, пользователь уже авторизован - делаем переход на желаемую страницу :)
		if (isItNewPageForTransition) {

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

						$state.go(toState, toParams);

					}

				},

				// В противном случае - перекидываем на страницу аутентификации.
				error: function () {

					transitionPage = loginPage;

					// В случае ошибки переходим на страницу логина.
					$state.go(loginPage);

				}

			});

		}

	});

}
