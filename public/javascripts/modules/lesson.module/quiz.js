/**
 * @author Aleksandrov Oleg
 * @since 05.04.17
 */

module.exports = Quiz;

var lodash = require('lodash');

function Quiz() {

	var currentQuestionNumber = 0;
	var correctAnswerCount = 0;
	var questions;
	var currentQuestion;

	var that = {};

	that.isQuizEnd = false;

	that.trySetNextQuestion = trySetNextQuestion;
	that.trySetPreviousQuestion = trySetPreviousQuestion;
	that.setAnswerOnCurrentQuestion = setAnswerOnCurrentQuestion;
	that.isLastQuestion = isLastQuestion;

	that.getCurrentQuestionNumber = getCurrentQuestionNumber;
	that.getCurrentQuestion = getCurrentQuestion;
	that.getCorrectAnswerCount = getCorrectAnswerCount;
	that.getQuestionsCount = getQuestionsCount;

	that.initialize = initialize;

	return that;

	//=============================================
	//==============PUBLIC METHOD==================
	//=============================================

	/**
	 * Функция устанавливет ответ на текущий вопрос.
	 * @param answerOption номер ответа на вопрос.
	 */
	function setAnswerOnCurrentQuestion(answerOption) {

		that.isAnswerOnCurrentQuestionGet = true;

		currentQuestion.answerOptions[answerOption].isSelect = !currentQuestion.answerOptions[answerOption].isSelect;

		if(!getSelectAnswersNumber(currentQuestion).length) {

			that.isAnswerOnCurrentQuestionGet = false;

		}

	}

	/**
	 * Функция открытия следующего вопроса.
	 */
	function trySetNextQuestion() {

		// если номер вопроса, не стал больше количества вопросов, то переходим к следующему вопросу
		// иначе заканчиваем опрос и показываем пользователю результат
		if(currentQuestionNumber < questions.length) {

			currentQuestion = questions[currentQuestionNumber++];

			that.isAnswerOnCurrentQuestionGet = false;

		}
		else {

			questions.forEach(function (question) {

				var userAnswers = getSelectAnswersNumber(question);

				var diff = lodash.difference(question.correctAnswerNumbers, userAnswers);

				correctAnswerCount += diff.length ? 0 : 1;
			});

			that.isQuizEnd = true;

		}

	}

	function trySetPreviousQuestion() {

		if(currentQuestionNumber > 1) {

			currentQuestion = questions[--currentQuestionNumber];

		}

	}

	function isLastQuestion() {

		return questions.length == currentQuestionNumber;

	}

	function initialize(newQuestions) {

		questions = newQuestions;

		questions.userAnswers = [];

		currentQuestion = questions[currentQuestionNumber++];

	}

	function getQuestionsCount() {

		return questions.length;

	}

	function getCorrectAnswerCount() {

		return correctAnswerCount;

	}

	function getCurrentQuestion() {

		return currentQuestion;

	}

	function getCurrentQuestionNumber() {

		return currentQuestionNumber;

	}

	function getSelectAnswersNumber(question) {

		var answers = [];

		question.answerOptions.forEach(function (answer, i) {

			if(answer.isSelect) {

				answers.push(i);

			}

		});

		return answers;

	}
}
