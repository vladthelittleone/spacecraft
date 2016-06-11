'use strict';

var Transport = require('./transport');

// Экспорт
module.exports = EntitiesFactory();

/**
 * Фабрика сущностей.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function EntitiesFactory() {

	// that / this
	var t = {};

	t.createTransport = createTransport;

	return t;

	/**
	 * Создать транспорт
     */
	function createTransport(game, x, y) {

		return Transport(game, x, y);

	}
}
