'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var random = require('../../utils/random');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Created by vaimer on 31.01.17.
 */

function StateWrapper(state) {

	var t = state;

	var player;
	var graphics;	// Графика
	var direction = true;

	t.entities = entities;

	return t;

	// function createShipsBesideSomeObject(game, x, y, type, count, openSpace) {
    //
	// 	for (var h = 0; h < count; h++) {
    //
	// 		var i1 = random.randomInt(-225, 225);
	// 		var i2 = random.randomInt(-225, 225);
    //
	// 		var spacecraft = type(game, x + i1, y + i2);
    //
	// 		spacecraft.sprite.angle = game.rnd.angle();
    //
	// 		if(!openSpace) {
    //
	// 			spacecraft.logic = function (h) {
    //
	// 				circleTrajectory(h);
    //
	// 			}
    //
	// 		} else {
    //
	// 			spacecraft.logic = function (h) {
    //
	// 				patrolTrajectory(h);
    //
	// 			}
	// 		}
	// 	}
	// }
    //
	// function circleTrajectory(h) {
    //
	// 	h.moveForward();
	// 	h.rotateLeft();
    //
	// }
    //
	// function patrolTrajectory(h) {
    //
	// 	if(direction && !withOurCoordinate(h.sprite.x, h.sprite.y, 2000)) {
    //
	// 		h.moveToXY(2000, 2000);
    //
	// 	}
    //
	// 	if(!direction && !withOurCoordinate(h.sprite.x, h.sprite.y, 1200)) {
    //
	// 		h.moveToXY(1200, 1200);
    //
	// 	}
    //
	// 	if(withOurCoordinate(h.sprite.x, h.sprite.y, 2000)) {
    //
	// 		direction = false;
    //
	// 	} else if(withOurCoordinate(h.sprite.x, h.sprite.y, 1200)) {
    //
	// 		direction = true;
    //
	// 	}
    //
	// }
    //
	// function withOurCoordinate(x, y, coordinate) {
    //
	// 	var distance = Phaser.Point.distance(new Phaser.Point(x, y),
	// 										 new Phaser.Point(coordinate, coordinate));
    //
	// 	return distance <= 40;
	// }
    //
	// function createSpaceObject(game, x, y) {
    //
	// 	// Верхний левый угол экрана
	// 	EntitiesFactory.createRedPlanet(game, x / 4, y / 4);
    //
	// 	// По идее верхний левый угол(надо будет перенсти)
	// 	EntitiesFactory.createMeteorFiledSphere(game, x / 2, y / 2 );
    //
	// 	// Верхний левый угол экрана
	// 	EntitiesFactory.createTurret(game, x / 4 - 300, y / 4 - 300);
    //
	// 	// Нижний правый угол экрана
	// 	EntitiesFactory.createStock(game, x / 2 + x + 150, y / 2 + y + 150);
    //
	// }
    //
    //
	// /**
	//  * Шаблонный метод инфициализации объектов.
	//  */
	// function entities(game) {
    //
	// 	var x = game.world.centerX;
	// 	var y = game.world.centerY;
    //
	// 	var base = EntitiesFactory.createAcademyBase(game, x, y);
    //
	// 	// Создать транспорт
	// 	player = EntitiesFactory.createHarvester(game, x + (base.sprite.width / 4), y, true);
	// 	var sprite = player.sprite;
    //
	// 	sprite.rotation = - Math.PI / 2;
    //
	// 	// API для урока
	// 	player.api = Api(player);
    //
	// 	createSpaceObject(game, x, y);
    //
	// 	createShipsBesideSomeObject(game, x, y, EntitiesFactory.createTransport, 2);
    //
	// 	createShipsBesideSomeObject(game, x - 800, y - 800, EntitiesFactory.createFighter, 3, true);
    //
	// 	createShipsBesideSomeObject(game, x / 4 - 300, y / 4 - 300, EntitiesFactory.createScout, 4);
    //
	// 	createShipsBesideSomeObject(game, x / 2 + x + 150, y / 2 + y + 150, EntitiesFactory.createHarvester, 5);
    //
	// 	// Корабль на верх.
	// 	sprite.bringToTop();
    //
	// 	// Фокус на на центре
	// 	t.followFor(sprite);
    //
	// 	CodeLauncher.setArguments(player.api);
    //
	// }

	/**
	 * Патрулирование местности
	 * @param spacecraft корабль
	 * @param x1 координата x первой точки
	 * @param y1 координата y первой точки
	 * @param x2 координата x второй точки
	 * @param y2 координата y второй точки
	 */
	function patrol(spacecraft, x1, y1, x2, y2) {

		var x = x1;
		var y = y1;

		spacecraft.logic = function (h) {

			h.moveToXY(x, y);

			if (spacecraft.distanceTo(x1, y1) < 100) {

				x = x2;
				y = y2;

			}

			if (spacecraft.distanceTo(x2, y2) < 100) {

				x = x1;
				y = y1;

			}

		}

	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		// Создать транспорт
		player = EntitiesFactory.createScout(game, 1000, 1000, true);
		var sprite = player.sprite;

		sprite.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField(game, x, y);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		var cruiser = EntitiesFactory.createCruiser(game, 2020, 1740);

		cruiser.sprite.rotation = - Math.PI / 2;

		// Дейстивя харвестра
		cruiser.logic = function (h) {

			h.moveToXY(150, 150);

		};

		var h1 = EntitiesFactory.createHarvester(game, 1859, 2156);

		h1.sprite.rotation = - 3.35 * Math.PI / 2;

		var s1 = EntitiesFactory.createScout(game, 2055, 1995);
		var s2 = EntitiesFactory.createScout(game, 2101, 1890);

		s1.sprite.rotation = - 3.85 * Math.PI / 2;
		s2.sprite.rotation = - 4.25 * Math.PI / 2;

		patrol(s1, 2055, 1995, 2700, 1200);
		patrol(s2, 2101, 1890, 2800, 1340);

		CodeLauncher.setArguments(player.api);

	}
}
