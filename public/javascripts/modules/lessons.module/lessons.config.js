'use strict';

LessonsConfig.$inject = ['$stateProvider'];

module.exports = LessonsConfig;

/**
 * Инициализация состояния окна выбора уроков.
 */
function LessonsConfig($stateProvider) {

	$stateProvider.state('lessons', {
		url:         '/lessons',
		templateUrl: 'views/lessons/lessons.html',
		controller:  'LessonsController as ctrl',
		resolve:     {

			// разрешаем просмотр списка уроков ТОЛЬКО при наличии факта аутентификации в сервисе.
			'authenticationStatus': ['promises', function (promises) {

				return promises.getAuthenticationStatus();

			}]
		}
	});

}
