'use strict';

WelcomeConfig.$inject = ['$stateProvider', 'ChartJsProvider'];

module.exports = WelcomeConfig;

/**
 * Инициализация состояния главной страницы.
 */
function WelcomeConfig ($stateProvider, ChartJsProvider) {

	// Настройка всех графиков
	ChartJsProvider.setOptions({
								   colours:    ['#152B39', '#C5C8C6'],
								   responsive: true
							   });

	// Конфигурация графиков линейных
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});

	$stateProvider.state('welcome', {
		url:         '/',
		templateUrl: 'views/main/welcome.html',
		controller:  'WelcomeController as ctrl',
		resolve:     {
			auth: function ($q, $state, authentication) {

				var deferred = $q.defer();

				authentication.getAuthenticationFlag(function (authorizationFlag) {

					if (authorizationFlag) {

						defer.resolve();

					} else {

						defer.reject();
						
						console.log("ERROR!");

						// Отменяем маршрутизацию.
						event.preventDefault();

					}
				});

				return defer.promise;

			}
		}
	});

}

