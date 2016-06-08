'use strict';

var autocompleter = require('./autocompleter');
var MarkerService = require('./marker-service');

module.exports = AceService;

/**
 * Сервис работы с Ace-редактором.
 *
 * Created by Ivan on 09.05.2016.
 */
function AceService() {

	var that = {};

	var markerService;
	var editor;

	that.initialize = initialize;
	that.getMarkerService = getMarkerService;

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

	/**
	 * Инициализация Ace
	 *
	 * @param edx Ace класс
     */
	function initialize (edx)
	{
		editor = edx;

		editor.$blockScrolling = Infinity;

		// Скролл до конца - скролл присутствует всегда.
		editor.setOption("scrollPastEnd", true);

		autocomplete(editor);

		markerService = MarkerService(editor);

	}

	function getMarkerService ()
	{
		return markerService;
	}
}
