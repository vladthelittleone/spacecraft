'use strict';

// Зависимости
var Shield = require('./shield');
var Unit = require('./unit');
var Meteor = require('./meteor');
var Mine = require('./mine');
var Base = require('./base');

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

	t.createCustomUnit = Unit;
	t.createShield = Shield;
	t.createMeteor = Meteor;
	t.createBase = Base;
	t.createMine = Mine;

	return t;

}
