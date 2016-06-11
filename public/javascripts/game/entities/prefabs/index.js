'use strict';

// Зависимости
var Transport = require('./transport');

// Экспорт
module.exports = PrefabsFactory();

/**
 * Фабрика prefab'ов.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function PrefabsFactory() {

	// that / this
	var t = {};

	t.createTransport = createTransport;

	return t;

	function createTransport(game, x, y, frame) {

		return new Transport(game, x, y, frame);

	}
}
