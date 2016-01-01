var Interpreter = function () {
	var that = {};
	var array = that.array = [];

	var print = function(value)
	{
		array.push(value);
	};

	var println = function(value)
	{
		array.push(value + '<br>');
	};

	var editCode = function(code)
	{
		return code + " array.toString().replace(new RegExp(',', 'g'), '');"
	};

	var runCode = function(code)
	{
		try
		{
			return eval(code);
		}
		catch (ex)
		{
			return ex.message;
		}
	};

	that.execute = function (code)
	{
		// очищаем от старых значений
		array = [];
		return runCode(editCode(code));
	};

	return that;
};
