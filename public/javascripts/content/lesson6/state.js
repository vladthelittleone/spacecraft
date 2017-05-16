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
	var deadFlag = false;
	var carrier;
	var explosions;	// Группа анимации взрывов

	t.entities = entities;
	t.logic = logic;

	return t;

	function createNewPlayer() {

		deadFlag = false;

		// Создать шаттл
		player = carrier.createSpacecraft(true, EntitiesFactory.createShuttle);

		// API для урока
		player.api = Api(player);

		// Фокус на на центре
		t.followFor(player.sprite);

		// Корабль на верх.
		player.sprite.bringToTop();

		carrier.sprite.bringToTop();

		CodeLauncher.setArguments(player.api);
	}

	/**
	 * Шаблонный метод инициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		carrier = EntitiesFactory.createCarrier(game, x, y);
		carrier.sprite.rotation = 3 * Math.PI / 2;

		createNewPlayer();

		// Группа анимации взрыва
		explosions = game.add.group();
		explosions.createMultiple(10, 'explosion');
		explosions.forEach(initExplosion, this);

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

		if(!player.sprite.alive && !deadFlag) {

			deadFlag = true;

			var explosion = explosions.getFirstExists(false);

			if(explosion) {

				explosion.scale.setTo(0.5);
				explosion.reset(player.sprite.x, player.sprite.y);
				explosion.play('explosion', 30, false, true);

				player.audio.playExplosion();

			}

			setTimeout(createNewPlayer, 3000);

		}
	}
}
