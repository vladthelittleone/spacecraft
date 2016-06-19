'use strict';

// Зависимости
var Harvester = require('./harvester');
var Transport = require('./transport');
var Shield = require('./shield');
var AcademyBase = require('./academy-base');
var Meteor = require('./meteor');
var Mine = require('./mine');

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
	t.createShield = createShield;
	t.createAcademyBase = createAcademyBase;
	t.createMeteor = createMeteor;
	t.createMine = createMine;

	return t;

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

	// Мина
	function createMine(game, x, y, scale) {

		return Mine(game, x, y, scale);

	}

	// База академии
	function createAcademyBase(game, x, y) {

		return AcademyBase(game, x, y);

	}
}
