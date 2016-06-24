'use strict';

module.exports = SpaceCraftCompleter;

/**
 * Модуль автодополнения кода.
 *
 * Created by vladthelittleone on 08.12.15.
 */

// Массив объектов и их функций
var documentation = require('./documentation.js');

function SpaceCraftCompleter(editor, rules) {

	var that = {};

	that.getCompletions = getCompletions;

	return that;

	function getCompletions (edx, session, pos, prefix, callback) {

		// Текушая строка
		var line = session.getLine(editor.getCursorPosition().row);

		// Массив сопостовления
		var binding = rules;

		// Создание списка автодополнения
		callback(null, generateAutocomplete(binding, line));

	}

}

/**
 * Проверка соответствия с помощью regExp.
 *
 * @param string строка введенная пользователем
 * @param value сравниваемая строка
 */
function test(string, value) {

	var name = value.name;

	var result = [];

	// Сравнение строки с заданным regExp.
	value.regExps.forEach(function (r) {

		var regExp = new RegExp(r);

		// Если строка соответсвует регулярному выраению получаем методы для объекта
		if (regExp.test(string)) {

			result = result.concat(getMethodsFrom(name));

		}

	});

	return result;

}

/**
 * @param objName имя объекта
 * @returns {Array} список функций объекта
 */
function getMethodsFrom(objName) {

	var array = [];

	// Взятие всех функций для имени объекта
	var functions = documentation[objName].functions;

	functions.forEach(function (value) {

		array = array.concat({value: value, meta: objName});

	});

	return array;
}

/**
 * Формирование списка соответствий функций к объектам.
 *
 * @param bindings regExp правила
 * @param line текущая напечатанная строка пользователем
 * @returns {Array}
 */
function generateAutocomplete(bindings, line) {

	var functionsNames = [];

	bindings.forEach(function (value) {

		functionsNames = functionsNames.concat(test(line, value));

	});

	if (!functionsNames.length) {

		bindings.forEach(function (value) {

			functionsNames = functionsNames.concat(getMethodsFrom(value.name));

		});

		functionsNames.push({value: 'spaceCraft', meta: 'local'});

		functionsNames.push({value: 'world', meta: 'local'});

	}

	return functionsNames;

}
