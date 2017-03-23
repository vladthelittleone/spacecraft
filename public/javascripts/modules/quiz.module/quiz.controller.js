'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 12.03.17
 */

QuizController.$inject = ['$scope', '$stateParams', 'lessonService'];

module.exports = QuizController;

function QuizController($scope, $stateParams, lessonService) {

	// $scope.idLesson = $stateParams.id;
	$scope.questions = lessonService.lessonContent($stateParams.id);

	$scope.result = {
		correctAnswer: 0,
		questionsWithError: [],
		questionsCount: $scope.questions.length
	};

	$scope.currentQuestion = $scope.questions.shift();

	$scope.trySetNextQuestion = trySetNextQuestion;
	$scope.trySetNextQuestionWithError = trySetNextQuestionWithError;

	//=============================================
	//==============PUBLIC METHOD==================
	//=============================================

	function trySetNextQuestion(answerNumber) {

		// проверяем правильно ли ответил на вопрос пользователь и если нет
		// то добавляем вопрос в список вопросов с неправильным ответом
		if($scope.currentQuestion.correctAnswerNumbers.includes(answerNumber))
		{
			$scope.result.questionsWithError.push($scope.currentQuestion);
		}

		// если номер вопроса, не стал больше количества вопросов, то переходим к следующему вопросу
		// иначе заканчиваем опрос и показываем пользователю результат
		if($scope.questions.length) {

			$scope.currentQuestion = $scope.questions.shift();

		}
		else
		{
			// Вычисляем сколько правильных ответов дал пользователь
			$scope.result.correctAnswer = $scope.result.questionsCount - $scope.result.questionsWithError.length;

			// показываем форму с результатами
			$scope.showResult = true;

			trySetNextQuestionWithError();
		}

	}

	function trySetNextQuestionWithError() {

		if($scope.result.questionsWithError.length) {

			$scope.currentQuestionWithError = $scope.result.questionsWithError.shift();

		}
		else {

			$scope.showQuiz = false;

		}
	}

}
