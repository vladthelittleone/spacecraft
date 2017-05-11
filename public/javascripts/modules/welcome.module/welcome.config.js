'use strict';

WelcomeConfig.$inject = ['$stateProvider', 'ChartJsProvider'];

var spinnerMessages = require('./../../utils/json/messages/spinner.json');

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
			'authenticationStatus': ['promises', 'spinner', function (promises, spinner) {

				spinner.start({message: spinnerMessages.authorization});

				return promises.getAuthenticationStatus();

			}],
			'lessonStatisticsData': ['promises', 'spinner', 'authenticationStatus', function (promises, spinner) {

				spinner.start({message: spinnerMessages.lessonStatistics});

				return promises.getLessonStatisticsData();

			}],
			'leaderBoardData':      ['promises', 'spinner', 'lessonStatisticsData', function (promises, spinner) {

				spinner.start({message: spinnerMessages.leaderBoard});

				return promises.getLeaderBoardData();

			}],
			'userProgressData':     ['promises', 'spinner', 'leaderBoardData', function (promises, spinner) {

				spinner.start({message: spinnerMessages.userProgress});

				return promises.getUserProgressData();

			}],
			'userInfoData':         ['promises', 'spinner', 'userProgressData', function (promises, spinner) {

				spinner.start({message: spinnerMessages.userInfo});

				return promises.getUserInfoData();

			}]
		}
	});

}

