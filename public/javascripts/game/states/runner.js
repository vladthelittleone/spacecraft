'use strict';

// Зависимости
var CodeLauncher = require('../launcher');

// Экспорт
module.exports = CodeRunner;

/**
 * Сервис запуска кода в игре.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function CodeRunner() {

	// that / this
	var t = {};

	// Const
	var END_LN = '</br>';

	var postUpdate;		// Коллбек обновления
	var preUpdate;		// Коллбек перед обновлением
	var args;			// Аргументы передаваемые в функцию
	var userFunction;	// Функция запуска кода
	var log = '';		// Логгирование выводимое ботом

	t.runCode = runCode;
	t.update = update;
	t.setArguments = setArguments;

	return t;


	/**
	 * Функция запуска код.
	 */
	function runCode(code, post, pre) {

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

		preUpdate = pre;
		postUpdate = post;

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

		preUpdate && preUpdate();

		// Код запущен и определена функция запуска
		if (CodeLauncher.isCodeRunning && userFunction) {

			try {

				// Отправляем в коллбек текст
				postUpdate && postUpdate(log);

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
