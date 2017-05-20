'use strict';

module.exports = LessonResults;

/**
 * Соотношение текста и результата.
 *
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
function LessonResults(messagesArray) {

	var t = {};

	t.resultCorrect = resultCorrect;
	t.unknownError = unknownError;
	t.text = text;
	t.resultNotCorrect = resultNotCorrect;
	t.resultText = resultText;
	t.result = result;
	t.resultFaield = resultFailed;
	t.resultsWrapper = resultsWrapper;

	return t;

	function formResult(status, message, css) {

		return {
			status:  status,
			message: message,
			css:     css,
			penaltyPointsForGame: t.penaltyPointsForGame
		};

	}

	function resultFailed(css) {

		return formResult(true, getText('failed'), css || 'bbot-angry');

	}

	function getText(value) {

		return messagesArray[value];

	}

	function resultCorrect(css) {

		return formResult(true, getText('correct'), css);

	}

	function unknownError(css) {

		return t.resultText('unknownError', css || 'bbot-wow');

	}

	function text(css) {

		return t.resultText('text', css);

	}

	function resultNotCorrect(messageType) {

		return t.resultText(messageType, 'bbot-angry');

	}

	function resultText(messageType, css) {

		return formResult(false, getText(messageType), css);

	}

	function result(v, css) {

		if (v) {

			return t.resultCorrect(css);

		}

		return t.unknownError(css);

	}

	/**
	 * Кастомная реализация для InterpreterHandler.
	 * Формирует вывод для BBot'a по результату выполнения кода в подуроке.
	 * Необходимо использовать когда в уроке должен быть вывод и нужно убедиться в его наличии,
	 * но проверять что выхлопнуло не нужно.
	 * @param value коллекция, которая содержит выхлоп полученный при интепритации кода в подуроке.
	 *
	 * Если при вызове этого в messagesArray.correct есть строка {{correctText}} она будет заменена на выхлом
	 * полученный на объеденении данных из массива value.
	 */
	function resultsWrapper(value) {

		var correctText = value ? value.join('<br>') : '';

		messagesArray.correct = messagesArray.correct.replace("{{correctText}}", correctText);

		if (correctText) {

			return resultCorrect();

		}

		return unknownError();
	}
}
