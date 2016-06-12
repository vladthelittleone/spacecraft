'use strict';

var World = require('./world');
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

	var world = World();

	t.createTransport = createTransport;
	t.getWorld = getWorld;

	return t;

	/**
	 * Создать транспорт
     */
	function createTransport(game, x, y, player) {

		var transport = Transport(game, x, y);

		player && world.setPlayer(transport);

		return transport;

	}

	/**
	 * Возвращаем объект всех сущностей.
     */
	function getWorld() {

		return world;

	}
}
