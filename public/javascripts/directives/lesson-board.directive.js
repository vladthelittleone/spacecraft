'use strict';

LessonBoard.$inject = ['$sce'];

module.exports = LessonBoard;

/**
 * Директива вывода текстового контента уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function LessonBoard($sce) {

	var directive = {
		scope:       {
			lesson:      '=', // информация о уроке
			textContent: '='  // true -  выводим текстовы контент урока
		},
		templateUrl: 'views/directives/lesson-board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		/**
		 * Возвращает контент урока.
		 */
		$scope.getContent = function () {

			// Проверка html на предмет xss
			return $sce.trustAsHtml($scope.lesson.content());

		};

		/**
		 * Возвращает текст подсказки.
		 */
		$scope.getHint = function () {

			if ($scope.lesson.hint) {

				return $sce.trustAsHtml($scope.lesson.hint);

			}

		};

		/**
		 * Инструкции пользователю.
		 */
		$scope.getInstructions = function () {

			return $sce.trustAsHtml($scope.lesson.instructions);

		};

		$scope.showHint = function () {

			$scope.hint = !$scope.hint;

		};

	}

}
