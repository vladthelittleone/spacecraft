'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var PrimitivesFactory = require('../../game/primitives');
var AnimationFactory = require('../../game/animations');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	// Дистанция при которой точка считается пройденной и необходимо лететь к следущеё точке
	const DISTANCE_TO_ACCEPT_POINT = 50;
	const RED_COLOR = 0xFF0000; // Красный.
	const DETECTION_RADIUS = 100;

	let t = state;

	let player;
	let enemy;
	let EMI;

	let centerX;
	let centerY;

	let pointIndex = 0;

	let warpTimer;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		centerX = game.world.centerX;
		centerY = game.world.centerY;

		EntitiesFactory.createMeteorFiledSphere({game: game, x: centerX - 750, y: centerY + 275, radius: 500});
		EntitiesFactory.createMeteorFiledSphere({game: game, x: centerX - 750, y: centerY - 1650, radius: 500});

		EntitiesFactory.createMeteorFiledSphere({game: game, x: centerX - 1250, y: centerY - 1650, radius: 500});
		EntitiesFactory.createMeteorFiledSphere({game: game, x: centerX - 1600, y: centerY + 200, radius: 500});

		EntitiesFactory.createMeteorFiledSphere({game: game, x: centerX - 2100, y: centerY - 900, radius: 500});

		// Создать транспорт игрока
		player = EntitiesFactory.createTransport({
													 game: game,
													 x: centerX,
													 y: centerY,
													 player: true,
													 velocity: 30
												 });

		player.sprite.angle = 260;
		player.isEMPActivated = false;
		player.sprite.visible = false;

		// EMI device
		EMI = PrimitivesFactory.createScannerCircle(game, 30, RED_COLOR);

		// Создать транспорт противника
		enemy = EntitiesFactory.createEbonHawk({
			game: game,
			x: centerX + 50,
			y: centerY - 200,
			velocity: 120
		});

		enemy.sprite.angle = 220;
		enemy.sprite.visible = false;
		enemy.logic = enemyMoving;

		// API для урока
		player.api = Api(player, enemy);

		CodeLauncher.setArguments(player.api);

	}

	function spawnPlayerWithWarp () {

		AnimationFactory.playWarpEffectBlue({
												x: centerX,
												y: centerY,
												angle: player.sprite.angle + 90,
												scale: 0.4
											});

		player.logic = moveToEnemy;
		player.audio.playWarpEffect();
	}

	// Метод логики корабля пользователя для 9 подурока.
	function moveToEnemy (obj) {

		// Постепенный выход из инвиза
		if (player.sprite.alpha < 1) {

			player.sprite.alpha += 0.03;

		}

		// Ведём камерой за нашим player'ом
		t.followFor(player.sprite);

		// Всегда следуем за enemy
		obj.moveToXY(enemy.sprite.x, enemy.sprite.y);

		// Отрисовка кружочка EMI в зависимости от включенности и расстояния до enemy
		if (player.isEMPActivated) {

			if (player.distanceTo(enemy.sprite.x, enemy.sprite.y) < DETECTION_RADIUS) {

				EMI.primitive.draw(player.sprite.x, player.sprite.y, DETECTION_RADIUS * 2, RED_COLOR);

				// Останавливаем объекты
				player.logic = undefined;
				enemy.logic = undefined;

			} else {

				player.setVelocity(20);

			}

		} else {

			EMI.primitive.clear();

		}

	}

	// Методо лигики врага для 9 подурока.
	// Враг просто курсирует по заданным точкам
	function enemyMoving (obj) {

		let x = [centerX - 500, centerX - 500,  centerX - 1500, centerX - 1500];
		let y = [centerY - 500, centerY - 1000, centerY - 1000, centerY - 500];

		if (obj.distanceTo(x[pointIndex], y[pointIndex]) < DISTANCE_TO_ACCEPT_POINT) {

			if (pointIndex === x.length - 1) {

				pointIndex = 0;

			} else {

				pointIndex++;

			}

		}

		obj.moveToXY(x[pointIndex], y[pointIndex]);

	}


	/**
	 * Логика в конкретном подуроке.
	 */
	function onContextLoaded(game, {subIndex: index}) {

		if (index === 8) {

			enemy.sprite.visible = true;
			player.sprite.visible = true;
			player.sprite.alpha = 0;
			t.followFor(player.sprite);

			warpTimer = game.time.create(false);
			warpTimer.add(3000, spawnPlayerWithWarp, this);
			warpTimer.start();

		}

	}
}
