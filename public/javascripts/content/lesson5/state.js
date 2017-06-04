'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var PrimitivesFactory = require('../../game/primitives');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	const RAD_COEF = 0.0174533; // Коеф. на который нужно домножать, что бы градусы переводить в радианы.
	const RED_COLOR = 0xFF0000; // Красный.
	const DETECTION_RADIUS = 100;

	let t = state;

	let player;
	let enemy;
	let EMI;

	let centerX;
	let centerY;

	let pointIndex = 0;

	t.entities = entities;
	t.onContextLoaded = onContextLoaded;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		centerX = game.world.centerX;
		centerY = game.world.centerY;

		// EMI device
		EMI = PrimitivesFactory.createScannerCircle(game, 30, RED_COLOR);

		// Создать транспорт игрока
		player = EntitiesFactory.createTransport({
			game: game,
			x: centerX,
			y: centerY - 600,
			player: true,
			velocity: 30
		});

		player.sprite.rotation = 90 * RAD_COEF;
		player.isEMPActivated = false;
		player.sprite.visible = false;

		// Создать транспорт противника
		enemy = EntitiesFactory.createTransport({
			game: game,
			x: centerX + 50,
			y: centerY - 200,
			velocity: 40
		});

		enemy.sprite.rotation = 90 * RAD_COEF;
		enemy.logic = enemyMoving;

		// API для урока
		player.api = Api(player, enemy);

		// Фокус на на игроке
		game.camera.focusOnXY(300, 300);

		CodeLauncher.setArguments(player.api);

	}

	function moveToEnemy (obj) {

		obj.sprite.visible = true;

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

	function enemyMoving (obj) {

		let x = [centerX, centerX + 500, centerX + 700, centerX + 800];
		let y = [centerY, centerY + 400, centerY + 600, centerY];

		if (obj.distanceTo(x[pointIndex], y[pointIndex]) < 50) {

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

			player.logic = moveToEnemy;

			// Фокус на на игроке
			t.followFor(player.sprite);

		}

	}
}
