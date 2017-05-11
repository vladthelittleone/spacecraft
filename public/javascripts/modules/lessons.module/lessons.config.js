'use strict';

LessonsConfig.$inject = ['$stateProvider'];

var spinnerMessages = require('./../../utils/json/messages/spinner.json');

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
			'authenticationStatus': ['promises', 'spinner', function (promises, spinner) {

				spinner.start({message: spinnerMessages.authorization});

				return promises.getAuthenticationStatus();

			}]
		}
	});

}
