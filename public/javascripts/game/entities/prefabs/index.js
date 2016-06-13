'use strict';

// Зависимости
var Harvester = require('./harvester');
var Transport = require('./transport');
var Shield = require('./shield');
var AcademyBase = require('./academy-base');

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

	return t;

	// Транспорт
	function createTransport(game, x, y) {

		return Transport(game, x, y);

	}

	// Щит
	function createShield(game, x, y, scale, player) {

		return Shield(game, x, y, scale, player);

	}

	// Харвестер
	function createHarvester(game, x, y) {

		return Harvester(game, x, y);

	}

	// База академии
	function createAcademyBase(game, x, y) {

		return AcademyBase(game, x, y);

	}
}
