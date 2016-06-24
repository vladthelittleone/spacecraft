'use strict';

module.exports = SpaceCraftCompleter;

/**
 * Модуль автодополнения кода.
 *
 * Created by vladthelittleone on 08.12.15.
 */

function SpaceCraftCompleter(editor, rules) {

	var that = {};

	that.getCompletions = getCompletions;

	return that;

	function getCompletions (edx, session, pos, prefix, callback) {

		// Текушая строка
		var line = session.getLine(editor.getCursorPosition().row);

		// Создание списка автодополнения
		callback(null, generateAutocomplete(rules, line));

	}

}

/**
 * Проверка соответствия с помощью regExp.
 *
 * @param string строка введенная пользователем
 * @param value сравниваемая строка
 */
function test(string, value) {

	var functions = value.functions;

	var result = [];

	// Сравнение строки с заданным regExp.
	value.regExps.forEach(function (r) {

		var regExp = new RegExp(r);

		// Если строка соответсвует регулярному выраению получаем методы для объекта
		if (regExp.test(string)) {

			result = result.concat(functions);

		}

	});

	return result;

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
    
			functionsNames = functionsNames.concat(value.functions);
    
		});
    
		functionsNames.push({value: 'spaceCraft', meta: 'local'});
    
		functionsNames.push({value: 'world', meta: 'local'});
    
	}

	return functionsNames;

}
