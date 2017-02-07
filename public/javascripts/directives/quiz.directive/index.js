/**
 * @author Aleksandrov Oleg
 * @since 02.02.17
 */

module.exports = Quiz;

function Quiz() {

	var directive = {
		scope: {
			// Структура массив, где каждый элемент имеет следующий формат
			// question: String, numberOfCorrectAnswer: Number, answerOptions : ['answerOne', ''answerTwo]
			questions: '=',
			showQuiz: '='
		},
		link:     link,
		templateUrl: '../../../views/directives/quiz.html',
		restrict:    'EA'

	};

	return directive;

	function link($scope) {

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
			if($scope.currentQuestion.numberOfCorrectAnswer !== answerNumber)
			{
				$scope.result.questionsWithError.push($scope.currentQuestion);
			}

			// увеличиваем номер вопроса
			// currentQuestionId++;

			// если номер вопроса, не стал больше количества вопросов, то переходим к следующему вопросу
			// иначе заканчиваем опрос и показываем пользователю результат
			if($scope.questions.length) {

				$scope.currentQuestion = $scope.questions.shift();

			}
			else
			{
				// Вычисляем сколько правильных ответов дал пользователь
				$scope.result.correctAnswer = $scope.result.questionsCount -
					                          $scope.result.questionsWithError.length;

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

}
