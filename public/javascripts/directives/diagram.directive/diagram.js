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

	var changes;

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

	/**
	 * Сохраняем изменения на случай, если директива еще не подгрузилась.
	 *
	 * @param callback изменения диаграммы
	 */
	function change(callback) {

		// Если диаграмма определена, то выполняем изменения
		if (diagram) {

			callback && callback(diagram);

		}

		// Сохраняем изменения даже, если диаграмма оперделена.
		// Так как может произойти пересоздание диаграммы.
		changes = callback;

	}

	/**
	 * Добавляем диаграмму и выполняем изменения.
	 *
	 * @param _diagram
	 */
	function setDiagram(_diagram) {

		diagram = _diagram;

		changes && changes(_diagram);

		changes = null;

	}

	function isHaveChanges() {

		return changes;

	}

}
