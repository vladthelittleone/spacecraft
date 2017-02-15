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

		EntitiesFactory.createRedPlanet(game, x / 4, y / 4);

		createShipsBesideAcademyBase(game, x, y);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		CodeLauncher.setArguments(player.api);

	}
}
