'use strict';

Quiz.$inject = ['$sce', 'lessonService'];

module.exports = Quiz;

/**
 * Директива вывода опроса.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function Quiz($sce, lessonService) {

	var directive = {
		scope:       {
			lesson:      '=' // информация о тесте
		},
		templateUrl: 'views/directives/quiz.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.getQuestions = getQuestions;

		// ==================================================
		// ======================PUBLIC======================
		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getQuestions () {

			// Проверка html на предмет xss
			if ($scope.lesson) {

				return $sce.trustAsHtml($scope.lesson.question.content);

			}

		}

	}

}
