'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 12.03.17
 */

QuizConfig.$inject = ['$stateProvider'];

module.exports = QuizConfig;

function QuizConfig($stateProvider) {

	$stateProvider.state('quiz', {
		url: '/quiz/:id',
		templateUrl: 'views/lessons/quiz.html',
		controller: 'QuizController as ctrl',
		resolve: {

			// разрешаем прохождение урока ТОЛЬКО при наличии факта аутентификации в сервисе.
			'authenticationStatus': ['promises', function (promises) {

				return promises.getAuthenticationStatus();

			}]

		}
	});

}
