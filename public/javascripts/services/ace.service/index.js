'use strict';

var ace = require('ace-builds');

var autocompleter = require('./autocompleter');
var markerService = require('./marker-service');

AceService.$inject = ['autocompleter'];

module.exports = AceService;

/**
 * Сервис работы с Ace-редактором.
 *
 * Created by Ivan on 09.05.2016.
 */
function AceService(editor, code) {

	var that = {};

	editor.$blockScrolling = Infinity;

	// установка кода
	editor.getSession().setValue(code);

	// Скролл до конца - скролл присутствует всегда.
	editor.setOption("scrollPastEnd", true);

	autocomplete(editor);

	that.markers = markerService(editor);

	return that;

	/**
	 * Инициализация в Ace автодополнения.
	 * @param editor
	 */
	function autocomplete(editor) {

		// Добавление
		var langTools = ace.require('ace/ext/language_tools');

		// Автодополнение
		var completer = autocompleter(editor);

		editor.completers = [completer];

		editor.setOptions({
			enableSnippets:            false, // Сниппеты: откл.
			enableBasicAutocompletion: true   // Стандартное автодополнение: вкл.
		});

		langTools.addCompleter(completer);
	}
}
