'use strict';

var lodash = require('lodash');

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
			lesson: '=', // информация о тесте
			answer: '='
		},
		templateUrl: 'views/directives/quiz.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		var answers = [];

		$scope.getQuestions = getQuestions;
		$scope.isAnswerSelected = isAnswerSelected;
		$scope.toggleAnswer = toggleAnswer;
		$scope.answerQuestion = answerQuestion;
		$scope.isCorrect = isCorrect;
		$scope.isNotCorrect = isNotCorrect;
		$scope.trustAsHtml = $sce.trustAsHtml;

		$scope.$watch('lesson', onLessonChange);

		// ==================================================
		// ======================PUBLIC======================
		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getQuestions() {

			// Проверка html на предмет xss
			if ($scope.lesson) {

				return $sce.trustAsHtml($scope.lesson.question.content);

			}

		}

		/**
		 * Передаем, либо удаляем номер ответа на ворос.
		 *
		 * @param num
		 */
		function toggleAnswer(num) {

			var index = answers.indexOf(num);

			if (index === -1) {

				answers.push(num)

			} else {

				answers.removeElementByIndex(index);

			}

		}

		/**
		 * Проверяем есть ли уже ответ на этот вопрос в коллекции.
		 * Используем для определения стиля чекбокса.
		 */
		function isAnswerSelected(num) {

			var index = answers.indexOf(num);

			return index !== -1;

		}

		/**
		 * Проверяем правильность ответа.
		 */
		function isCorrect(num) {

			var index = $scope.intersection.indexOf(num);

			return index !== -1;

		}

		/**
		 * Проверяем неправильность ответа
		 */
		function isNotCorrect(num) {

			var i1 = $scope.exceptCorrect.indexOf(num);
			var i2 = $scope.exceptAnswers.indexOf(num);

			return i1 !== -1 || i2 !== -1;

		}

		/**
		 * Вызываем коллбек передаваемый в директиву +
		 * устанавливаем флаг ответа.
		 */
		function answerQuestion() {

			var correct = $scope.lesson.question.correctAnswerNumbers;

			$scope.intersection = lodash.intersection(answers, correct);
			$scope.exceptCorrect = lodash.difference(answers, correct);
			$scope.exceptAnswers = lodash.difference(correct, answers);

			if ($scope.intersection.length !== answers.length) {

				var lessonStatistics = lessonService.getCurrentLessonStatistics();
				var lessonPoints = lessonStatistics.getLessonContentPoints();

				lessonStatistics.incPenaltyPointsForGame(lessonPoints.incorrectAnswer);

			}

			answers = correct;

			$scope.isAnswerClicked = true;
			$scope.answer();

		}

		/**
		 * При переходе на другой урок или изменениях.
		 */
		function onLessonChange() {

			answers = [];

			$scope.isAnswerClicked = false;
			$scope.intersection = []

		}

	}

}
