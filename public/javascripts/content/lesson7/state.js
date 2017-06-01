'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');

var Random = require('../../utils/random');

var Api = require('./api');

var moment = require('moment');

module.exports = StateWrapper;

function StateWrapper(state) {

	// Дистанция до керриера
	var PARENT_SHIP_DISTANCE = 200;
	var LESSON_TIMEOUT = 5000;

	var t = state;

	var player;
	var carrier;    // Авианосец
	var explosions;	// Группа анимации взрывов
	var updateTime = moment().valueOf();

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;

	return t;

	function createNewPlayer() {

		// Создать шаттл
		player = carrier.create(corvetteLogic, true);

		// API для урока
		player.api = Api(player);

		// Фокус на на центре
		t.followFor(player.sprite);

		// Корабль на верх.
		player.sprite.bringToTop();
		carrier.sprite.bringToTop();

		player.sprite.events.onKilled.add(onKillCallback, this);

		CodeLauncher.setArguments(player.api);
	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var worldCenterX = game.world.centerX;
		var worldCenterY = game.world.centerY;

		carrier = EntitiesFactory.createCarrier({
			game: game,
			x: worldCenterX,
			y: worldCenterY
		});

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


	function onKillCallback() {

		var explosion = explosions.getFirstExists(false);

		if (explosion) {

			explosion.scale.setTo(0.5);
			explosion.reset(player.sprite.x, player.sprite.y);
			explosion.play('explosion', 30, false, true);

		}

		carrier.sprite.bringToTop();
		player.sprite.destroy();

		setTimeout(createNewPlayer, LESSON_TIMEOUT);

	}

	function corvetteLogic(c, parent) {

		if (!c.sprite.alive) {

			return;

		}

		var x = parent.sprite.x;
		var y = parent.sprite.y;

		if(c.distanceTo(x, y) <= PARENT_SHIP_DISTANCE) {

			c.moveForward();

		}

	}

	function generateRandomLogic() {

		var action = [
			player.moveForward.bind(player),
			player.rotateLeft.bind(player),
			player.rotateRight.bind(player)
		];

		return action[Random.randomInt(0, 2)];

	}

	function onContextLoaded(game, {subIndex: index}) {

		if(index === 2) {

			// Пока пользователь не поменял капитана
			if(!player.api.isTrueCaptain()) {

				let delta = moment().valueOf() - updateTime;

				if (delta > LESSON_TIMEOUT) {

					// Делаем случайные траектории полета корабля
					player.logic = generateRandomLogic();
					updateTime = moment().valueOf();

				}

			} else {

				var worldCenterX = game.world.centerX;
				var worldCenterY = game.world.centerY;

				// Отправляем корабль пользователя к примерному месту начала урока
				player.logic = player.moveToXY.bind(player, worldCenterX, worldCenterY - 300);

			}

			// Указываем, что необходимо повторять.
			return true;

		}

	}
}
