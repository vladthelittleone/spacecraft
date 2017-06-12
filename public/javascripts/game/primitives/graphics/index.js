'use strict';

// Зависимости
var Circle = require('./circle');

// Экспорт
module.exports = GraphicsFactory();

/**
 * Фабрика графики.
 *
 * @author Skurishin Vladislav
 * @since 16.02.17
 */
function GraphicsFactory() {

	// that / this
	var t = {};

	t.createCircle = createCircle;

	return t;

	// Отрисовка круга
	function createCircle(game, x, y, diameter, color) {

		return Circle(game, x, y, diameter, color);

	}
}
