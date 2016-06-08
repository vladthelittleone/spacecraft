'use strict';

module.exports = Interpreter();

/**
 * Интерпретатор команд JavaScript.
 *
 * Created by vladthelittleone on 07.01.16.
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
				exception: true,
				message:   ex.message
			}

		}

	}

}
