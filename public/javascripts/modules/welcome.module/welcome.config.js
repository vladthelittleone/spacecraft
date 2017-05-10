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
			'authenticationStatus': ['promises', 'spinner', function (promises, spinner) {

				spinner.start({message: 'Проверка статуса авторизации...'});

				return promises.getAuthenticationStatus();

			}],
			'lessonStatisticsData': ['promises', 'spinner', 'authenticationStatus', function (promises, spinner) {

				spinner.start({message:'Загружаем статистику по урокам...'});

				return promises.getLessonStatisticsData();

			}],
			'leaderBoardData':      ['promises', 'spinner', 'lessonStatisticsData', function (promises, spinner) {

				spinner.start({message:'Загрузка таблицы лидеров...'});

				return promises.getLeaderBoardData();

			}],
			'userProgressData':     ['promises', 'spinner', 'leaderBoardData', function (promises, spinner) {

				spinner.start({message:'Загрузка Вашего прогресса...'});

				return promises.getUserProgressData();

			}],
			'userInfoData':         ['promises', 'spinner', 'userProgressData', function (promises, spinner) {

				spinner.start({message:'Загрузка информации о Вас...'});

				return promises.getUserInfoData();

			}]
		}
	});

}

