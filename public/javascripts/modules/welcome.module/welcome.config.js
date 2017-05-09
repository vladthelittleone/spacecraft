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
			'authenticationStatus': ['promises', '$rootScope', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Проверка статуса авторизации...');

				return promises.getAuthenticationStatus();

			}],
			'lessonStatisticsData': ['promises', '$rootScope', 'authenticationStatus', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Загружаем статистику по урокам...');

				return promises.getLessonStatisticsData();

			}],
			'leaderBoardData':      ['promises', '$rootScope', 'lessonStatisticsData', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Загрузка таблицы лидеров...');

				return promises.getLeaderBoardData();

			}],
			'userProgressData':     ['promises', '$rootScope', 'leaderBoardData', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Загрузка Вашего прогресса...');

				return promises.getUserProgressData();

			}],
			'userInfoData':         ['promises', '$rootScope', 'userProgressData', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Загрузка информации о Вас...');

				return promises.getUserInfoData();

			}]
		}
	});

}

