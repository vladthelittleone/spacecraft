'use strict';

// Зависимости
var Harvester = require('./harvester');
var Transport = require('./transport');
var Shield = require('./shield');
var AcademyBase = require('./academy-base');
var Meteor = require('./meteor');
var Mine = require('./mine');
var Scout = require('./scout');
var RedPlanet = require('./red-planet');
var Turret = require('./turret');
var Stock = require('./stock');
var Fighter = require('./fighter');

// Экспорт
module.exports = PrefabsFactory();

/**
 * Фабрика prefab'ов.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function PrefabsFactory() {

	// that / this
	var t = {};

	t.createTransport = createTransport;
	t.createHarvester = createHarvester;
	t.createShield = createShield;
	t.createAcademyBase = createAcademyBase;
	t.createRedPlanet = createRedPlanet;
	t.createFighter = createFighter;
	t.createMeteor = createMeteor;
	t.createMine = createMine;
	t.createScout = createScout;
	t.createTurret = createTurret;
	t.createStock = createStock;

	return t;

	// Разведчик
	function createScout(game, x, y) {

		return Scout(game, x, y);

	}

	// Транспорт
	function createTransport(game, x, y) {

		return Transport(game, x, y);

	}

	// Метеорит
	function createMeteor(game, scale, x, y, n) {

		return Meteor(game, scale, x, y, n);

	}

	// Щит
	function createShield(game, x, y, scale, player) {

		return Shield(game, x, y, scale, player);

	}

	// Харвестер
	function createHarvester(game, x, y) {

		return Harvester(game, x, y);

	}

	// Убийца
	function createFighter(game, x, y) {

		return Fighter(game, x, y);

	}

	// Мина
	function createMine(game, x, y, scale, group) {

		return Mine(game, x, y, scale, group);

	}

	// База академии
	function createAcademyBase(game, x, y) {

		return AcademyBase(game, x, y);

	}

	// Красная планета
	function createRedPlanet(game, x, y) {

		return RedPlanet(game, x, y);

	}

	// Защитная турель
	function createTurret(game, x, y) {

		return Turret(game, x, y);

	}

	function createStock(game, x, y) {

		return Stock(game, x, y);
	}
}
