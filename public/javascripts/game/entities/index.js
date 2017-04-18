'use strict';

// Зависимости

// Сущности
var World = require('./world');
var Transport = require('./transport');
var Harvester = require('./harvester');
var AcademyBase = require('./academy-base');
var Meteor = require('./meteor');
var Mine = require('./mine');
var Scout = require('./scout');
var RedPlanet = require('./red-planet');
var ResearchCenter = require('./research-center');
var Fighter = require('./fighter');
var Cruiser = require('./cruiser');
var StaticUnit = require('./static-unit');

var Random = require('../../utils/random');

// Экспорт
module.exports = EntitiesFactory();

/**
 * Фабрика сущностей.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function EntitiesFactory() {

	// that / this
	var t = {};

	var world;	// Контейнер объектов.

	t.initialization = initialization;
	t.createTransport = createTransport;
	t.createHarvester = createHarvester;
	t.createAcademyBase = createAcademyBase;
	t.createRedPlanet = createRedPlanet;
	t.createMeteor = createMeteor;
	t.createMeteorField = createMeteorField;
	t.createMeteorFiledSphere = createMeteorFiledSphere;
	t.createFighter = createFighter;
	t.createResearchCenter = createResearchCenter;
	t.createMine = createMine;
	t.createScout = createScout;
	t.createCruiser = createCruiser;
	t.createStaticUnit = createStaticUnit;
	t.getWorld = getWorld;

	return t;

	/**
	 * Создать разведчика.
	 */
	function createScout(game, x, y, player) {

		var scout = Scout(game, x, y, player);

		var id = world.pushObject(scout);

		player && world.setPlayer(id);

		return scout;

	}

	/**
	 * Создать крузер.
	 */
	function createCruiser(game, x, y, player) {

		var cruiser = Cruiser(game, x, y, player);

		var id = world.pushObject(cruiser);

		player && world.setPlayer(id);

		return cruiser;

	}

	/**
	 * Создать транспорт.
     */
	function createTransport(game, x, y, player) {

		var transport = Transport(game, x, y, player);

		var id = world.pushObject(transport);

		player && world.setPlayer(id);

		return transport;

	}

	/**
	 * Создать харвестер
	 */
	function createHarvester(game, x, y, player) {

		var harvester = Harvester(game, x, y, player);

		var id = world.pushObject(harvester);

		player && world.setPlayer(id);

		return harvester;

	}

	/**
	 * Создание коробля бойца
	 */
	function createFighter(game, x, y, player) {

		var fighter = Fighter(game, x, y, player);

		var id = world.pushObject(fighter);

		player && world.setPlayer(id);

		return fighter;
	}

	/**
	 * Создать базу академии
	 */
	function createAcademyBase(game, x, y) {

		var base = AcademyBase(game, x, y);

		world.pushObject(base);

		return base;

	}

	/**
	 * Создание планеты
	 */
	function createRedPlanet(game, x, y) {

		var planet = RedPlanet(game, x, y);

		world.pushObject(planet);

		return planet;
	}

	/**
	 * Создать метеорит
	 */
	function createMeteor(game, x, y) {

		var meteor = Meteor(game, x, y);

		world.pushObject(meteor);

		return meteor;

	}

	/**
	 * Создать метеоритное поле
	 */
	function createMeteorField(game, x, y) {

		var radius = Phaser.Point.distance(new Phaser.Point(x, y), new Phaser.Point(0, 0));

		var args = {
					count: 2 * x,
					start: 0,
					shift: 10,
					radius: radius,
					randomSize: 200
		};

		createMeteors(game, args);

	}

	/**
	 * Создать метеоритное поле округлое
	 */
	function createMeteorFiledSphere(game, x, y) {

		var radius = Phaser.Point.distance(new Phaser.Point(x - 50, 0), new Phaser.Point(0, y + 50));

		var args = {
					count: x,
					start: 0,
					shift: 3,
					radius: radius,
					randomSize: 100
		};

		createMeteors(game, args);
	}

	function createMeteors(game, args) {

		var radius = args.radius;

		for (var i = args.start; i < args.count; i = i + args.shift) {

			var j = Math.sqrt(radius * radius - i * i);

			var m = createMeteor(game, i + Random.randomInt(0, args.randomSize), j + Random.randomInt(0, args.randomSize));

			m.sprite.scale.setTo(Random.randomInt(1, 3) * 0.1);
			m.sprite.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

		}

	}

	/**
	 * Создать исследовательский центр
	 */
	function createResearchCenter(game, x, y) {

		var center = ResearchCenter(game, x, y);

		world.pushObject(center);

		return center;

	}

	/**
	 * Создать мину
	 */
	function createMine(game, x, y, scale, group) {

		return Mine(game, x, y, scale, group);

	}

	/**
	 * Создать мину
	 */
	function createStaticUnit(game, x, y, preload, scale) {

		return StaticUnit(game, x, y, preload, scale);

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
