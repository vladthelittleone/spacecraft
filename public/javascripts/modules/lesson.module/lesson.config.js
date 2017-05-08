'use strict';

LessonConfig.$inject = ['$stateProvider'];

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
			'authenticationStatus': ['promises', function (promises) {

				return promises.getAuthenticationStatus();

			}],

			'game': ['promises', '$stateParams', function(promises, $stateParams) {

				return promises.getGame($stateParams.id);

			}]

		}

	});

}
