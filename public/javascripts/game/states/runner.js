'use strict';

// Зависимости
var CodeLauncher = require('../launcher');

// Экспорт
module.exports = CodeRunner;

/**
 * Сервис запуска кода в игре.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function CodeRunner(game) {

	// that / this
	var t = {};

	// Const
	var END_LN = '</br>';

	var logic;			// Коллбек обновления
	var args;			// Аргументы передаваемые в функцию
	var userFunction;	// Функция запуска кода
	var log = '';		// Логгирование выводимое ботом

	t.runCode = runCode;
	t.stopCode = stopCode;
	t.update = update;
	t.setArguments = setArguments;

	return t;


	/**
	 * Функция запуска код.
	 */
	function runCode(code, callback) {

		try {

			var Class = new Function('BBotDebug', code);

			// Функция пользователя.
			userFunction = new Class(botDebug);

		}
		catch (err) {

			userFunction = null;

			// В случае ошибки
			CodeLauncher.onError(err);

		}

		logic = callback;

	}

	/**
	 * Функция остановки кода.
	 */
	function stopCode() {

		userFunction = null;

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

		if (userFunction) {

			try {

				// Отправляем в коллбек текст
				logic && logic(log);

				userFunction.run && userFunction.run.apply(null, args);

			} catch (err) {

				// В случае ошибки
				CodeLauncher.onError(err);

			}
		}

	}

	/**
	 * Текст бота.
	 */
	function botDebug(text) {

		log += text + END_LN;

	}
}
