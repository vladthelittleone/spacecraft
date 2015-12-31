var Interpreter = function () {
	var that = {};
	var array = that.array = [];

	var print = function(value)
	{
		// todo мб выводить напрямую в форму
		array.push(value);
	};

	var editCode = function(code)
	{
		return code + " array.toString();"
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
		array = [];
		return runCode(editCode(code));
	};

	return that;
};
