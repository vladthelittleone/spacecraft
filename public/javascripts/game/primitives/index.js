'use strict';

// Примитивы
var Circle = require('./circle');

// Экспорт
module.exports = PrimitivesFactory();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function PrimitivesFactory() {

	// that / this
	var t = {};

	t.createCircle = createCircle;

	return t;

	/**
	 * Создать разведчика.
	 */
	function createCircle(game, diameter, color) {

		return Circle(game, diameter, color);

	}

}
