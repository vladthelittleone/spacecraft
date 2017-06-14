'use strict';

// Библиотеки
var lodash = require('lodash');

// Зависимости
var Unit = require('./units/unit');

// Сущности
var Meteor = require('./units/static/meteor');
var Mine = require('./units/static/mine');
var StaticUnit = require('./units/static/static-unit');

var Cruiser = require('./units/heavy/cruiser');
var Carrier = require('./units/heavy/carrier');
var Combat = require('./units/heavy/combat');
var Fighter = require('./units/heavy/fighter');

var Transport = require('./units/transport');
var Harvester = require('./units/light/harvester');
var Scout = require('./units/light/scout');
var LightCorvette = require('./units/light/corvette');
var EbonHawk = require('./units/light/ebonHawk');

var Planet = require('./units/base/planet');
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
	t.createMeteorSphere = createMeteorSphere;

	t.createMeteor = Meteor;
	t.createPlanet = Planet;

	t.createMine = Mine;
	t.createStaticUnit = StaticUnit;

	t.createSensor = createByType(StaticUnit);
	t.createCarrier = createByType(Carrier);
	t.createBase = createByType(Base);
	t.createTransport = createByType(Transport);
	t.createHarvester = createByType(Harvester);
	t.createAcademyBase = createByType(AcademyBase);
	t.createFighter = createByType(Fighter);
	t.createResearchCenter = createByType(ResearchCenter);
	t.createScout = createByType(Scout);
	t.createCruiser = createByType(Cruiser);
	t.createCombat = createByType(Combat);
	t.createCarriersShip = createByType(LightCorvette);
	t.createEbonHawk = createByType(EbonHawk);
	t.createLightCorvette = createByType(LightCorvette);

	return t;

	/**
	 * Создать метеоритное поле.
	 */
	function createMeteorField({game, x, y}) {

		let radius = Phaser.Point.distance(new Phaser.Point(x, y),
										   new Phaser.Point(0, 0));

		let shift = 10;
		let count = 2 * x;
		let randomSize = 200;

		for (let i = 0; i < count; i = i + shift) {

			let j = Math.sqrt(radius * radius - i * i);

			let m = t.createMeteor({
				game: game,
				x: 	 i + Random.randomInt(0, randomSize),
				y: 	 j + Random.randomInt(0, randomSize)
			});

			setMeteorParameters(m);
		}

	}

	/**
	 * Создать метеоритное поле округлое.
	 */
	function createMeteorSphere({game, x, y, radius}) {

		let meteorX;
		let meteorY;

		for(let i = 0; i <= 100; i++) {

			meteorX = Random.randomInt(x - radius, x + radius);
			meteorY = Random.randomInt(y - radius, y + radius);

			// Проверяем попадают ли координаты в радуик окружности
			if(Math.pow(meteorX - x, 2) + Math.pow(meteorY - y, 2) <= Math.pow(radius, 2)) {

				let m = t.createMeteor({
					game: game,
					x: 	 meteorX,
					y: 	 meteorY
				});

				setMeteorParameters(m);
			}

		}

	}

	function setMeteorParameters(m) {

		m.scale.setTo(Random.randomInt(1, 3) * 0.1);
		m.body.angularVelocity = Random.randomInt(1, 10) * 0.2;

	}

	/**
	 * Обертка вокруг метода создания.
	 */
	function createByType(typeArgs) {

		return function (userArgs) {

			return create(lodash.assign(typeArgs, userArgs));

		}

	}

	/**
	 * Функция создания объекта.
	 */
	function create(args) {

		// Если фабрика не задана, задаем текущую.
		args.factory = args.factory || t;

		let unit = Unit(args);
		let id = World.pushObject(unit);

		// Задаем как объект игрока, если этот корабль юзера.
		args.player && World.setPlayer(id);

		return unit;

	}

}
