/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
var BBotText = function (text)
{
	var that = {};

	function result(status, message)
	{
		return {
			status: status,
			message: message
		};
	}

	function getText(value)
	{
		return text[value];
	}

	that.resultCorrect = function ()
	{
		return result(true, getText('correct'));
	};

	that.unknownError = function ()
	{
		return that.resultNotCorrect('unknownError');
	};

	that.resultNotCorrect = function (messageType)
	{
		return result(false, getText(messageType));
	};

	that.result = function (v)
	{
		if (v)
		{
			return that.resultCorrect();
		}

		return that.unknownError();
	};


	return that;
};
