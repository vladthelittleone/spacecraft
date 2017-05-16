'use strict';

Stars.$inject = ['connection', '$state'];

var analytics = require('../utils/analytics');

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

			connection.rateLesson(scope.lessonId, value);

			analytics.rateLesson(scope.lessonId, value);

			$state.go('lessons');

		};

	}

}
