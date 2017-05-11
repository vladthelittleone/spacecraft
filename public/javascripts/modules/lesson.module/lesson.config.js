'use strict';

LessonConfig.$inject = ['$stateProvider'];

var spinnerMessages = require('./../../utils/json/messages/spinner.json');

module.exports = LessonConfig;

/**
 * Инициализация состояния урока.
 */
function LessonConfig($stateProvider) {

	$stateProvider.state('lesson', {
		url:         '/lesson/:id',
		templateUrl: 'views/lessons/lesson.html',
		controller:  'LessonController as ctrl',
		resolve:     {

			// разрешаем прохождение урока ТОЛЬКО при наличии факта аутентификации в сервисе.
			'authenticationStatus': ['promises', 'spinner', function (promises, spinner) {

				spinner.start({message: spinnerMessages.authorization});

				return promises.getAuthenticationStatus();

			}],

			'game': ['promises', '$stateParams', 'spinner', 'authenticationStatus', function(promises, $stateParams, spinner) {

				spinner.start({message: spinnerMessages.game});

				return promises.getGame($stateParams.id);

			}]

		}

	});

}
