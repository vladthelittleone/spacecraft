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

	t.entities = entities;

	return t;

	function createShipsBesideAcademyBase(game, x, y) {

		for (var h = 0; h < 2; h++) {

			var i1 = random.randomInt(-225, 225);
			var i2 = random.randomInt(-225, 225);

			var type = EntitiesFactory.createHarvester;

			var spacecraft = type(game, x + i1, y + i2);

			spacecraft.sprite.angle = game.rnd.angle();

			spacecraft.logic = function (h) {

				h.moveForward();
				h.rotateLeft();

			}

		}
	}

	function createSpaceObject(game, x, y) {

		// Верхний левый угол экрана
		EntitiesFactory.createRedPlanet(game, x / 4, y / 4);

		// По идее верхний левый угол(надо будет перенсти)
		EntitiesFactory.createMeteorFiledSphere(game, 0, y * 2 - 200);

		// Верхний левый угол экрана
		EntitiesFactory.createTurret(game, x / 4 - 300, y / 4 - 300);

		// Нижний правый угол экрана
		EntitiesFactory.createStock(game, x / 2 + x + 150, y / 2 + y + 150);

	}

	function crateShipsInSpace(game, x, y) {

		for (var h = 0; h < 4; h++) {

			var i1 = random.randomInt(-225, 225);
			var i2 = random.randomInt(-225, 225);

			var newX = x / 2 + x + i1;
			var newY = y / 2 + y + i2;

			var type = EntitiesFactory.createHarvester;

			var spacecraft = type(game, newX, newY);

			spacecraft.sprite.angle = game.rnd.angle();

			var destination = true;

			spacecraft.logic = function (h, newX, newY, destination) {

				if(destination && h.x != x && h.y != y) {

					h.moveToXY(x, y);

				}

				if(!destination && h.x != newX && h.y != newY) {

					h.moveToXY(newX, newY);

				}

				if(h.x == x && h.y == y)
				{
					destination = false;

				} else if(h.x == newX && h.y == newY) {

					destination = true;
				}
			}

		}

	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		var base = EntitiesFactory.createAcademyBase(game, x, y);

		// Создать транспорт
		player = EntitiesFactory.createTransport(game, x + (base.sprite.width / 4), y, true);
		var sprite = player.sprite;

		sprite.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		createSpaceObject(game, x, y);

		createShipsBesideAcademyBase(game, x, y);

		//crateShipsInSpace(game, x, y);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		CodeLauncher.setArguments(player.api);

	}
}
