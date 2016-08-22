'use strict';

module.exports = Interpreter();

/**
 * Интерпретатор команд JavaScript.
 *
 * @author Skurishin Vladislav
 * @since 07.01.2016
 */
function Interpreter () {

	var that = {};
	var array = that.array = [];

	that.execute = execute;

	return that;

	function execute (code) {

		// очищаем от старых значений
		array = [];

		try {

			/**
			 * Функция для интерпретации.
			 * Используется для вывода сообщения в окно BBot'а.
			 */
			var BBotDebug = function (value) {

				array.push(value);

			};

			var result = eval(code);

			if (array.length) {

				return array;

			}

			return result;

		}
		catch (ex) {

			return {
				exception: ex,
				message:   ex.message
			}

		}

	}

}
