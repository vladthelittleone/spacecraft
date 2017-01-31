'use strict';

LessonBoard.$inject = ['$sce', 'lessonService'];

module.exports = LessonBoard;

/**
 * Директива вывода текстового контента уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function LessonBoard($sce, lessonService) {

	let directive = {
		scope:       {
			lesson:      '=' // информация о уроке
		},
		templateUrl: 'views/directives/lesson-board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.getContent = getContent;
		$scope.getHint = getHint;
		$scope.getInstructions = getInstructions;
		$scope.showHint = showHint;

		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getContent () {

			// Проверка html на предмет xss
			return $sce.trustAsHtml($scope.lesson.content());

		}

		/**
		 * Возвращает текст подсказки.
		 */
		function getHint () {

			if ($scope.lesson.hint) {

				return $sce.trustAsHtml($scope.lesson.hint);

			}

		}

		/**
		 * Инструкции пользователю.
		 */
		function getInstructions () {

			return $sce.trustAsHtml($scope.lesson.instructions);

		}

		function showHint () {

			$scope.hint = !$scope.hint;

			tryIncPenaltyPoints();
		}

		/**
		 * Штрафуем пользователя за обращение к подсказке.
		 */
		function tryIncPenaltyPoints() {

			var currentLessonStatistics = lessonService.getCurrentLessonStatistics();

			if ($scope.hint && currentLessonStatistics) {

				var showHitPenaltyPointsSize = lessonService.getCurrentLessonContentPoints()
					                                        .showHitPenaltyPointsSize ||
					                            0;

				currentLessonStatistics.incPenaltyPointsForGame(showHitPenaltyPointsSize);

			}

		}

	}

}
