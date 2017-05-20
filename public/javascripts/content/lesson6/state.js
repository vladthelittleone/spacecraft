'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var UpdateManager = require('../../game/update-manager');

var Random = require('../../utils/random');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	// Дистанция до керриера
	var PARENT_SHIP_DISTANCE = 200;

	var t = state;

	var player;
	var graphics;	// Графика
	var carrier;    // Авианосец
	var explosions;	// Группа анимации взрывов

	// Координаты центра мира
	var x;
	var y;

	var newLogic = true;

	t.entities = entities;
	t.logic = logic;

	return t;

	function logic() {

		subThirdLessonLogic();

	}

	function createNewPlayer() {

		// Создать шаттл
		player = carrier.create(corvetteLogic, true);

		player.sprite.rotation = carrier.sprite.rotation;

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
	 * Логика в конкретном подуроке.
	 */
	function subThirdLessonLogic() {

		// Нумерация подуроков начинается с 0
		if(UpdateManager.getSubIndex() === 2 && newLogic) {

			// В 3 подуроке создаем видемость захвата корабля Bbot'ом
			createRandomLogicPlayerSpacecraft();

		}
	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		x = game.world.centerX;
		y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		carrier = EntitiesFactory.createCarrier(game, x, y);
		carrier.sprite.rotation = 3 * Math.PI / 2;

		createNewPlayer();

		// Группа анимации взрыва
		explosions = game.add.group();
		explosions.createMultiple(10, 'explosion');
		explosions.forEach(initExplosion, this);

		subThirdLessonLogic();

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

		setTimeout(createNewPlayer, 5000);

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

		var randomNumber = Random.randomInt(1, 3);

		switch(randomNumber) {
			case 1:
				return player.moveForward.bind(player);
			case 2:
				return player.rotateLeft.bind(player);
			case 3:
				return player.rotateRight.bind(player);
		}
	}

	function createRandomLogicPlayerSpacecraft() {

		carrier.sprite.bringToTop();
		player.sprite.bringToTop();
		// Пока пользователь не поменял капитана
		if(!player.api.isTrueCaptain()) {

			toggleToNewLogic();

			// Делаем случайные траектории полета корабля
			player.logic = generateRandomLogic();

			setTimeout(toggleToNewLogic, 10000);

		} else {

			// Отправляем корабль пользователя к примерному месту начала урока
			player.logic = player.moveToXY.bind(player, x, y - 300);

		}
	}

	function toggleToNewLogic() {

		newLogic = !newLogic;

	}
}
