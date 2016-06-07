'use strict';

Stars.$inject = ['connection', '$state'];

module.exports = Stars;

/**
 * Директива, отвечающиая за оценку урока.
 *
 * Created by Ivan on 23.03.2016.
 */
function Stars(connection, $state) {

	var directive = {
		scope:       {
			idLesson: '='
		},
		templateUrl: 'views/directives/stars.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		/**
		 * При изменении radio-кнопки, выполняется запрос на сервер и
		 * переход на lessons ссылку.
		 */
		$scope.radioChange = function (value) {

			connection.httpLessonRate($scope.idLesson, value);

			$state.go('lessons');

		};

	}

}
