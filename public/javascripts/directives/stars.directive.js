'use strict';

Stars.$inject = ['connection', '$state'];

module.exports = Stars;

/**
 * Директива, отвечающиая за оценку урока.
 *
 * @author Ivan Makovchik
 * @since 23.03.2016
 */
function Stars(connection, $state) {

	var directive = {
		scope:      {
			lessonId: '='
		},
		templateUrl: 'views/directives/stars.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope) {

		/**
		 * При изменении radio-кнопки, выполняется запрос на сервер и
		 * переход на lessons ссылку.
		 */
		scope.radioChange = function (value) {

			connection.lessonRate(scope.lessonId, value);

			var yaParam = {};

			yaParam[scope.lessonId] = value;

			yaCounter43763714.reachGoal('rateLesson', yaParam);

			$state.go('lessons');

		};

	}

}
