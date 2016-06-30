/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
var BBotText = function (text)
{
	var that = {};

	function result(status, message, css)
	{
		return {
			status: status,
			message: message,
			css: css
		};
	}

	function getText(value)
	{
		return text[value];
	}

	that.resultCorrect = function (css)
	{
		return result(true, getText('correct'), css);
	};

	that.unknownError = function (css)
	{
		return that.resultText('unknownError', css || 'bbot-wow');
	};

	that.text = function (css)
	{
		return that.resultText('text', css);
	};

	that.resultNotCorrect = function (messageType)
	{
		return that.resultText(messageType, 'bbot-angry');
	};

	that.resultText = function (messageType, css)
	{
		return result(false, getText(messageType), css);
	};

	that.result = function (v, css)
	{
		if (v)
		{
			return that.resultCorrect(css);
		}

		return that.unknownError(css);
	};


	return that;
};
