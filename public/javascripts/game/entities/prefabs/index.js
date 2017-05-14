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
var ResearchCenter = require('./research-center');
var Fighter = require('./fighter');
var Cruiser = require('./cruiser');
var Carrier = require('./carrier');
var Shuttle = require('./shuttle');
var StaticUnit = require('./static-unit');

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

	t.createTransport = Transport;
	t.createHarvester = Harvester;
	t.createShield = Shield;
	t.createAcademyBase = AcademyBase;
	t.createRedPlanet = RedPlanet;
	t.createFighter = Fighter;
	t.createMeteor = Meteor;
	t.createMine = Mine;
	t.createCruiser = Cruiser;
	t.createScout = Scout;
	t.createStaticUnit = StaticUnit;
	t.createResearchCenter = ResearchCenter;
	t.createCarrier = Carrier;
	t.createShuttle = Shuttle;

	return t;

}
