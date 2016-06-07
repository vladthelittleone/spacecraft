'use strict';

var ace = require('ace-builds');

module.exports = MarkerService;

/**
 * Сервис маркеров.
 *
 * Created by Ivan on 11.05.2016.
 */
function MarkerService(editor) {

	var that = {};

	var Range = ace.require('ace/range').Range;
	var session = editor.getSession();

	that.deleteMarkerAndAnnotation = deleteMarkerAndAnnotation;
	that.setMarkerAndAnnotation = setMarkerAndAnnotation;
	that.paintMarker = paintMarker;

	return that;

	/**
	 * Отрисовка маркеров.
	 *
 	 * @param x1 строка начала маркера
	 * @param y1 колонка начала маркера
	 * @param x2 строка конца маркера
	 * @param y2 колонка конца маркера
	 * @param type вид маркера
     */
	function paintMarker (x1, y1, x2, y2, type) {

		x1 = x1 - 1;
		x2 = x2 || x1;

		if (!type) {

			return session.highlightLines(x1, x2, 'bar').id;

		}
		else {

			// по какимто причинам не получается выделить одну строку, нужно как миимум две.
			return session.addMarker(new Range(x1, y1, x2, y2), 'bar', type);

		}

	}

	/**
	 * Удаление маркера по идентификатору.
     */
	function deleteMarkerAndAnnotation (markerId) {

		// Очищаем Ace от анотаций и маркеров.
		session.clearAnnotations();

		// Удаляем маркер.
		session.removeMarker(markerId);

	}

	/**
	 * Добавление маркера с анотацией.
	 *
	 * @param line номер строки
	 * @param text текст аннотации
	 * @param typeAnnotation тип анотации
	 */
	function setMarkerAndAnnotation (line, text, typeAnnotation) {

		var markerId = paintMarker(session, line);

		session.setAnnotations([{
			row:    line - 1,
			column: 0,
			text:   text.toString(),
			type:   typeAnnotation || "error"
		}]);

		return markerId
	}

}
