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
			'authenticationStatus': ['promises', 'spinner', function (promises, spinner) {

				spinner.start({message:'Проверка статуса авторизации...'});

				return promises.getAuthenticationStatus();

			}],

			'game': ['promises', '$stateParams', 'spinner', 'authenticationStatus', function(promises, $stateParams, spinner) {

				spinner.start({message:'Загрузка игрового мира...'});

				return promises.getGame($stateParams.id);

			}]

		}

	});

}
