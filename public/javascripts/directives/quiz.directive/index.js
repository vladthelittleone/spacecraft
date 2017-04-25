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
		$scope.isCheckboxSelected = isCheckboxSelected;
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

			// Нельзя, если уже ответил.
			if (!$scope.isAnswerClicked) {

				var index = answers.indexOf(num);

				if (index === -1) {

					answers.push(num)

				} else {

					answers.removeElementByIndex(index);

				}

			}

		}

		/**
		 * Проверяем есть ли уже ответ на этот вопрос в коллекции.
		 * Используем для определения стиля чекбокса.
		 */
		function isCheckboxSelected(num) {

			var index = answers.indexOf(num);

			return index !== -1;

		}

		/**
		 * Проверяем правильность ответа.
		 */
		function isCorrect(num) {

			// Пользователь нажал на "Ответить".
			// И выбрал данный чекбокс ответа. (под номером num)
			if ($scope.isAnswerClicked && isCheckboxSelected(num))
			{
				var index = $scope.intersection.indexOf(num);

				return index !== -1;
			}

			return false;
		}

		/**
		 * Проверяем неправильность ответа
		 * Создан с целью проверки того, что данный ответ
		 * выбран.
		 */
		function isNotCorrect(num) {

			if ($scope.isAnswerClicked && isCheckboxSelected(num))
			{
				return !isCorrect(num);
			}

			return false;

		}

		/**
		 * Вызываем коллбек передаваемый в директиву +
		 * устанавливаем флаг ответа.
		 */
		function answerQuestion() {

			// Если не выбраны ответы,
			// не отвечаем на вопрос.
			if (!answers.length) {

				return;

			}

			var correct = $scope.lesson.question.correctAnswerNumbers;

			$scope.intersection = lodash.intersection(answers, correct);

			if ($scope.intersection.length !== answers.length) {

				var lessonStatistics = lessonService.getCurrentLessonStatistics();
				var lessonPoints = lessonStatistics.getLessonContentPoints();

				lessonStatistics.incPenaltyPointsForGame(lessonPoints.incorrectAnswer);

			}

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
