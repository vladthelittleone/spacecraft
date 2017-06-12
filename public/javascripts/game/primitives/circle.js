'use strict';

// Зависимости
var GraphicsFactory = require('./graphics');

// Экспорт
module.exports = Circle;

/**
 * Объект метеора.
 *
 * @author Skurishin Vladislav
 * @since 16.02.17
 */
function Circle(game, diameter, color) {

	// that / this
	var t = {};
	var _diameter = diameter;

	/**
	 * Создаем спрайт.
	 */
	t.primitive = GraphicsFactory.createCircle(game);
	t.draw = draw;
	t.drawXY = drawXY;
	t.clear = clear;

	return t;

	function draw(x, y, diameter) {

		t.primitive.draw(x, y, diameter, color);

	}

	function drawXY(x, y) {

		t.primitive.draw(x, y, _diameter, color);

	}

	function clear() {

		t.primitive.clear();

	}
}
