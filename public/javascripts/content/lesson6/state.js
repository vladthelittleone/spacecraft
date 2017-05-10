'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');

var UpdateManager = require('../../game/update-manager');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	var t = state;

	var player;
	var graphics;	// Графика
	var carrier;

	t.entities = entities;
	t.logic = logic;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		carrier = EntitiesFactory.createCarrier(game, x, y);
		carrier.sprite.rotation = 3 * Math.PI / 2;

		// Создать транспорт
		player = carrier.createShuttle(true, EntitiesFactory.createShuttle);

		player.sprite.rotation = -3.35 * Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Фокус на на центре
		t.followFor(player.sprite);

		// Корабль на верх.
		player.sprite.bringToTop();

		CodeLauncher.setArguments(player.api);

	}

	/**
	 * Инициализация взрывов.
	 */
	function initExplosion (explosion) {

		explosion.anchor.x = 0.5;
		explosion.anchor.y = 0.5;
		explosion.animations.add('explosion');

	}


	function logic() {

	}
}
