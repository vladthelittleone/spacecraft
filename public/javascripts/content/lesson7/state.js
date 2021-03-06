'use strict';

// Библиотеки
var moment = require('moment');

// Зависимости
const EntitiesFactory = require('../../game/entities');
const CodeLauncher = require('../../game/launcher');
const Random = require('../../utils/random');
const MeteorFactory = EntitiesFactory.MeteorFactory;

const World = require('../../game/entities/world');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	// Дистанция до керриера
	const PARENT_SHIP_DISTANCE = 200;
	const LESSON_TIMEOUT = 5000;

	let t = state;

	let player;
	let locust;    // Авианосец
	let explosions;	// Группа анимации взрывов
	let updateTime = moment().valueOf();
	let scoutSensor;
	let locustSensor;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;
	t.backgroundObjects = require('../backgrounds/modulation-zone');

	return t;

	function createNewPlayer() {

		// Создать шаттл
		player = locust.create(corvetteLogic, true);

		// API для урока
		player.api = Api(player);

		// Фокус на на центре
		t.followFor(player);

		// Корабль на верх.
		player.bringToTop();
		locust.bringToTop();

		player.events.onKilled.add(onKillCallback, this);

		CodeLauncher.setArguments(player.api);
	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var worldCenterX = game.world.centerX;
		var worldCenterY = game.world.centerY;

		MeteorFactory.createMeteorSphere({
			game: game,
			x: worldCenterX - 400,
			y: worldCenterY - 400,
			radius: 150
		});

		MeteorFactory.createMeteorSphere({
			game: game,
			x: worldCenterX - 600,
			y: worldCenterY - 500,
			radius: 150
		});


		locust = EntitiesFactory.createLocust({
			game: game,
			x: worldCenterX,
			y: worldCenterY,
			faction: 1
		});

		locust.rotation = 3 * Math.PI / 2;

		// API для урока
		locust.api = Api(locust);

		createNewPlayer();

		scoutSensor = EntitiesFactory.create({
			game: game,
			x: worldCenterX - 500,
			y: worldCenterY - 500,
			preload: 'sensor',
			faction: 2,
			maxHealth: 1,
			needAudio: true
		});

		locustSensor = EntitiesFactory.create({
			game: game,
			x: worldCenterX,
			y: worldCenterY - 260,
			preload: 'sensor',
			faction: 2,
			maxHealth: 1,
			needAudio: true
		});

		scoutSensor.visible = false;
		scoutSensor.bringToTop();

		locustSensor.visible = false;
		locustSensor.bringToTop();

		scoutSensor.events.onKilled.add(() => player.api.setSensorKilled(true), this);
		locustSensor.events.onKilled.add(() => locust.api.setSensorKilled(true), this);

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
			explosion.reset(player.x, player.y);
			explosion.play('explosion', 30, false, true);

		}

		locust.bringToTop();
		player.destroy();

		setTimeout(createNewPlayer, LESSON_TIMEOUT);

	}

	function corvetteLogic(c, parent) {

		if (!c.alive) {

			return;

		}

		var x = parent.x;
		var y = parent.y;

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
				player.logic = player.moveToXY.bind(player, worldCenterX, worldCenterY - 200);

			}

			// Указываем, что необходимо повторять.
			return true;

		}

		if(index === 3) {

			scoutSensor.visible = true;

		}

		// Для 5 сабурока происходит смена корабля для управления
		if(index === 4) {

			locustSensor.visible = true;
			player.visible = false;

			World.setPlayer(locust.id);

			// Фокус на на центре
			t.followFor(locust);

			CodeLauncher.setArguments(locust.api);
		}

		player.logic = corvetteLogic.bind(player, player, locust);

	}
}
