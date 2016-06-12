'use strict';

var World = require('./world');
var Transport = require('./transport');
var Harvester = require('./harvester');

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

	var world = World();

	t.createTransport = createTransport;
	t.createHarvester = createHarvester;
	t.getWorld = getWorld;

	return t;

	/**
	 * Создать транспорт.
     */
	function createTransport(game, x, y, player) {

		var transport = Transport(game, x, y);

		var id = world.pushObject(transport);

		player && world.setPlayer(id);

		return transport;

	}

	/**
	 * Создать транспорт
	 */
	function createHarvester(game, x, y, player) {

		var harvester = Harvester(game, x, y);

		var id = world.pushObject(harvester);

		player && world.setPlayer(id);

		return harvester;

	}

	/**
	 * Возвращаем объект всех сущностей.
     */
	function getWorld() {

		return world;

	}
}
