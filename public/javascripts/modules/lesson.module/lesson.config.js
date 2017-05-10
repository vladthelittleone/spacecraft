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
			'authenticationStatus': ['promises', '$rootScope', function (promises, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Проверка статуса авторизации...');

				return promises.getAuthenticationStatus();

			}],

			'game': ['promises', '$stateParams', '$rootScope', 'authenticationStatus', function(promises, $stateParams, $rootScope) {

				$rootScope.$emit('setSpinnerMessage', 'Загрузка игрового мира...');

				return promises.getGame($stateParams.id);

			}]

		}

	});

}
