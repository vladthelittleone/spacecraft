'use strict';

// Экспорт
module.exports = Diagram();

/**
 * Сервис предоставления информации о текущей диаграмме.
 *
 * @author Skurishin Vladislav
 * @since 11.09.16
 */
function Diagram () {

	// that / this
	var t = {};

	var changes = [];

	/**
	 * Объект, который отвечает за диаграмму;
	 */
	var diagram;

	t.getDiagram = getDiagram;
	t.change = change;
	t.setDiagram = setDiagram;
	t.isHaveChanges = isHaveChanges;

	return t;

	function getDiagram() {

		return diagram;

	}

	function change(callback) {

		if (diagram) {

			callback && callback(diagram);

		} else {

			callback && changes.push(callback);

		}

	}

	function setDiagram(_diagram) {

		diagram = _diagram;

		changes.forEach(function (e) {

			e(_diagram);

		});

	}

	function isHaveChanges() {

		return changes.length;

	}

}
