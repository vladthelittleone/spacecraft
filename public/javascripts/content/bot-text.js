'use strict';

module.exports = BBotText;

/**
 * Соотношение текста и результата.
 *
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
function BBotText(messagesArray) {

	var t = {};

	t.resultCorrect = resultCorrect;
	t.unknownError = unknownError;
	t.text = text;
	t.resultNotCorrect = resultNotCorrect;
	t.resultText = resultText;
	t.result = result;

	return t;

	function formResult(status, message, css) {

		return {
			status:  status,
			message: message,
			css:     css
		};

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
}
