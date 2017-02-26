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

	function createShipsBesideSomeObject(game, x, y, type, count) {

		for (var h = 0; h < count; h++) {

			var i1 = random.randomInt(-225, 225);
			var i2 = random.randomInt(-225, 225);

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
		EntitiesFactory.createMeteorFiledSphere(game, x / 2, y / 2 );

		// Верхний левый угол экрана
		EntitiesFactory.createTurret(game, x / 4 - 300, y / 4 - 300);

		// Нижний правый угол экрана
		EntitiesFactory.createStock(game, x / 2 + x + 150, y / 2 + y + 150);

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

		createShipsBesideSomeObject(game, x, y, EntitiesFactory.createHarvester, 2);

		createShipsBesideSomeObject(game, x - 800, y - 800, EntitiesFactory.createHarvester, 5);

		createShipsBesideSomeObject(game, x / 4 - 300, y / 4 - 300, EntitiesFactory.createScout, 4);

		createShipsBesideSomeObject(game, x / 2 + x + 150, y / 2 + y + 150, EntitiesFactory.createTransport, 5);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		CodeLauncher.setArguments(player.api);

	}
}
