'use strict';

WelcomeConfig.$inject = ['$stateProvider', 'ChartJsProvider'];

module.exports = WelcomeConfig;

/**
 * Инициализация состояния главной страницы.
 */
function WelcomeConfig($stateProvider, ChartJsProvider) {

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
			// разрешаем просмотр стартовой страницы ТОЛЬКО при наличии факта аутентификации в сервисе.
			'authenticationStatus': ['promises', function (promises) {

				return promises.getAuthenticationStatus();

			}],
			'lessonStatisticsData': ['promises', function (promises) {

				return promises.getLessonStatisticsData();

			}],
			'leaderBoardData':      ['promises', function (promises) {

				return promises.getLeaderBoardData();

			}],
			'userProgressData':     ['promises', function (promises) {

				return promises.getUserProgressData();

			}],
			'userInfoData':         ['promises', function (promises) {

				return promises.getUserInfoData();

			}]
		}
	});

}

