'use strict';

// Зависимости

// Сущности
var Meteor = require('./units/static/meteor');
var Mine = require('./units/static/mine');
var StaticUnit = require('./units/static/static-unit');

var Cruiser = require('./units/heavy/cruiser');
var Carrier = require('./units/heavy/carrier');
var Combat = require('./units/heavy/combat');
var Fighter = require('./units/heavy/fighter');

var Transport = require('./units/light/transport');
var Harvester = require('./units/light/harvester');
var Scout = require('./units/light/scout');
var LightCorvette = require('./units/light/corvette');

var RedPlanet = require('./units/base/red-planet');
var ResearchCenter = require('./units/base/research-center');
var AcademyBase = require('./units/base/academy-base');
var Base = require('./units/base/base');

var World = require('./world');
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

	t.createMeteorField = createMeteorField;
	t.createMeteorFiledSphere = createMeteorFiledSphere;

	t.createMine = Mine;
	t.createStaticUnit = StaticUnit;

	t.createCarrier = createByType(Carrier);
	t.createBase = createByType(Base);
	t.createMeteor = createByType(Meteor);
	t.createTransport = createByType(Transport);
	t.createHarvester = createByType(Harvester);
	t.createAcademyBase = createByType(AcademyBase);
	t.createRedPlanet = createByType(RedPlanet);
	t.createFighter = createByType(Fighter);
	t.createResearchCenter = createByType(ResearchCenter);
	t.createScout = createByType(Scout);
	t.createCruiser = createByType(Cruiser);
	t.createCombat = createByType(Combat);
	t.createCarriersShip = createByType(LightCorvette);

	return t;

	/**
	 * Создать метеоритное поле.
	 */
	function createMeteorField({game, x, y}) {

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

	/**
	 * Создание несколько метеоритов.
	 *
	 * @param game объект игры
	 * @param args параметры
	 */
	function createMeteors(game, args) {

		var radius = args.radius;

		for (var i = args.start; i < args.count; i = i + args.shift) {

			var j = Math.sqrt(radius * radius - i * i);

			var m = t.createMeteor({
			   game: game,
			   x: 	 i + Random.randomInt(0, args.randomSize),
			   y: 	 j + Random.randomInt(0, args.randomSize)
			});

			m.sprite.scale.setTo(Random.randomInt(1, 3) * 0.1);
			m.sprite.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

		}

	}

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(type) {

		return function (args) {

			return create(args, type);

		}

	}

	/**
	 * Функция создания объекта.
	 *
	 * @param args параметры
	 * @param args.game игра
	 * @param args.x координата X объекта
	 * @param args.y координата Y объекта
	 * @param args.player объект игрока
	 * @param args.faction фракция объекта
	 * @param args.preload объект спрайта
	 * @param args.factory фабрика объектов
	 * @param createFunction функция создания юнита
	 */
	function create(args, createFunction) {

		// Если фабрика не задана, задаем текущую.
		args.factory = args.factory || t;

		let unit = createFunction(args);
		let id = World.pushObject(unit);

		// Задаем как объект игрока, если этот корабль юзера.
		args.player && World.setPlayer(id);

		return unit;

	}

}
