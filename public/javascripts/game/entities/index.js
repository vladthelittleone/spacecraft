'use strict';

// Зависимости

// Сущности
var World = require('./world');
var Transport = require('./transport');
var Harvester = require('./harvester');
var AcademyBase = require('./academy-base');

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

	var world;	// Контейнер объектов.

	t.initialization = initialization;
	t.createTransport = createTransport;
	t.createHarvester = createHarvester;
	t.createAcademyBase = createAcademyBase;
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
	 * Создать транспорт
	 */
	function createAcademyBase(game, x, y) {

		var base = AcademyBase(game, x, y);

		world.pushObject(base);

		return base;

	}

	/**
	 * Возвращаем объект всех сущностей.
     */
	function getWorld() {

		return world;

	}

	/**
	 * Инициализация.
	 */
	function initialization() {

		world = World();

	}
}
