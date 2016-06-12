'use strict';

// Экспорт
module.exports = CodeRunner;

/**
 * Сервис запуска кода в игре.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function CodeRunner (game) {

	// that / this
	var t = {};

	var args;			// Аргументы передаваемые в функцию
	var runFunction;	// Функция запуска кода

	t.runCode = runCode;
	t.stopCode = stopCode;
	t.update = update;
	t.setArguments = setArguments;

	return t;


	/**
	 * Функция запуска код.
	 */
	function runCode(code) {

		var Class = new Function(code);

		// Функция пользователя.
		runFunction = new Class();

		game.paused = false;

	}

	/**
	 * Функция остановки кода.
	 */
	function stopCode() {

		runFunction = null;

		game.paused = true;

	}

	/**
	 * Передача аргументов.
     */
	function setArguments() {

		args = Array.prototype.slice.call(arguments);

	}

	/**
	 * Вызов кода польщователяю
	 */
	function update() {

		if (runFunction) {

			runFunction.run && runFunction.run.apply(null, args);

		}

	}
}
