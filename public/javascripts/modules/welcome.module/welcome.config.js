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
			authenticationStatus: function (authentication) {

				return authentication.getPromiseOfAuthenticationStatus();

			},
			lessonStatisticsData: function ($q, connection) {

				return $q(function (resolve, reject) {

					connection.getLessonsStatistics(resolve, reject);

				});

			},
			leaderBoardData:      function ($q, connection) {

				return $q(function (resolve, reject) {

					connection.getLeaderboard(resolve, reject);

				});

			},
			userProgressData:     function ($q, statisticsStorage) {

				return $q(function (resolve, reject) {

					statisticsStorage.getUserProgress(resolve, reject);

				});
			},
			userInfoData:         function ($q, connection) {

				return $q(function (resolve, reject) {

					connection.getUserInfo(resolve, reject);

				})

			}
		}
	});

}

