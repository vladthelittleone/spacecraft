'use strict';

// Зависимости

// Сущности
var World = require('./world');
var Meteor = require('./units/static/meteor');
var Mine = require('./units/static/mine');
var StaticUnit = require('./units/static/static-unit');

var Cruiser = require('./units/heavy/cruiser');
var Carrier = require('./units/heavy/carrier');

var Transport = require('./units/light/transport');
var Harvester = require('./units/light/harvester');
var Scout = require('./units/light/scout');
var LightCorvette = require('./units/light/corvette');
var Fighter = require('./units/light/fighter');

var RedPlanet = require('./units/base/red-planet');
var ResearchCenter = require('./units/base/research-center');
var AcademyBase = require('./units/base/academy-base');

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
	t.createMeteorField = createMeteorField;
	t.createMeteorFiledSphere = createMeteorFiledSphere;
	t.createCarrier = createCarrier;

	t.createMine = Mine;
	t.createStaticUnit = StaticUnit;

	t.createMeteor = createByType(Meteor);
	t.createTransport = createByType(Transport);
	t.createHarvester = createByType(Harvester);
	t.createAcademyBase = createByType(AcademyBase);
	t.createRedPlanet = createByType(RedPlanet);
	t.createFighter = createByType(Fighter);
	t.createResearchCenter = createByType(ResearchCenter);
	t.createScout = createByType(Scout);
	t.createCruiser = createByType(Cruiser);
	t.createCarriersShip = createByType(LightCorvette);
	t.getWorld = getWorld;

	return t;

	/**
	 * Создать метеоритное поле.
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
	 * Создать метеоритное поле округлое.
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

			var m = t.createMeteor(game, i + Random.randomInt(0, args.randomSize), j + Random.randomInt(0, args.randomSize));

			m.sprite.scale.setTo(Random.randomInt(1, 3) * 0.1);
			m.sprite.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

		}

	}

	/**
	 * Создание несущего корабля.
	 */
	function createCarrier(game, x, y, player) {

		var unit = Carrier(game, t, x, y, player);

		var id = world.pushObject(unit);

		player && world.setPlayer(id);

		return unit;

	}

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(type) {

		return function (game, x, y, player) {

			return create(game, x, y, player, type);

		}

	}

	/**
	 * Функция создания объекта.
	 * @param game игра
	 * @param x координата X объекта
	 * @param y координата Y объекта
	 * @param player объект игрока
	 * @param createFunction функция создания юнита
	 */
	function create(game, x, y, player, createFunction) {

		var unit = createFunction(game, x, y, player);

		var id = world.pushObject(unit);

		player && world.setPlayer(id);

		return unit;

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
