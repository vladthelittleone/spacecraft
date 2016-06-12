'use strict';

// Зависимости
var Harvester = require('./harvester');
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
	t.createHarvester = createHarvester;

	return t;

	// Транспорт
	function createTransport(game, x, y) {

		return new Transport(game, x, y, 'transport');

	}

	// Харвестер
	function createHarvester(game, x, y) {

		return new Harvester(game, x, y, 'harvester');

	}
}
