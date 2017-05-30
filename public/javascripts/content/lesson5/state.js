'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var PrimitivesFactory = require('../../game/primitives');
var UpdateManager = require('../../game/update-manager');

var Api = require('./api');

module.exports = StateWrapper;

function StateWrapper(state) {

	const RAD_COEF = 0.0174533; // Коеф на который нужно домножать, что бы градусы переводить в радианы
	const RED_COLOR = 0xFF0000; // Красный
	const DETECTION_RADIUS = 100;

	let t = state;

	let player;
	let enemy;
	let hackDevice;

	let centerX;
	let centerY;

	let currentPointNumber = 0;

	t.entities = entities;
	t.logic = logic;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		centerX = game.world.centerX;
		centerY = game.world.centerY;

		// hack device
		hackDevice = PrimitivesFactory.createScannerCircle(game, 30, RED_COLOR);

		// Создать транспорт игрока
		player = EntitiesFactory.createHarvester(game, centerX, centerY - 600, true);
		player.sprite.rotation = 90 * RAD_COEF;
		player.isHackDeviceActivated = false;
		player.sprite.visible = false;
		player.logic = playerLogic;

		// Создать транспорт противника
		enemy = EntitiesFactory.createHarvester(game, centerX + 50, centerY - 200, false);
		enemy.sprite.rotation = 90 * RAD_COEF;
		enemy.sprite.visible = false;
		enemy.logic = enemyLogic;


		// API для урока
		player.api = Api(player, enemy);

		// Фокус на на игроке
		t.followFor(player.sprite);

		subLessonLogic(game);

		CodeLauncher.setArguments(player.api);

	}

	function subLessonLogic () {

		if (UpdateManager.getSubIndex() == 8) {

			player.sprite.visible = true;
			enemy.sprite.visible = true;

		}

	}

	function playerLogic (obj) {

		if (UpdateManager.getSubIndex() == 8) {

			obj.sprite.visible = true;

			// Ведём камерой за нашим player'ом
			t.followFor(player.sprite);

			// Всегда следуем за enemy
			obj.moveToXY(enemy.sprite.x, enemy.sprite.y);

			// Отрисовка кружочка hackDevice в зависимости от включенности и расстояния до enemy
			if (player.isHackDeviceActivated) {

				if (player.distanceTo(enemy.sprite.x, enemy.sprite.y) < DETECTION_RADIUS) {

					hackDevice.primitive.draw(player.sprite.x, player.sprite.y, DETECTION_RADIUS * 2, RED_COLOR);

					// Останавливаем объекты
					player.logic = undefined;
					enemy.logic = undefined;

				} else {

					player.setVelocity(20);

				}

			} else {

				hackDevice.primitive.clear();

			}

		}

	}

	function enemyLogic (obj) {

		if (UpdateManager.getSubIndex() == 8) {

			obj.sprite.visible = true;

			let x = [centerX, centerX + 500, centerX + 700];
			let y = [centerY, centerY, centerY + 700];

			if (obj.distanceTo(x[currentPointNumber], y[currentPointNumber]) < 50) {

				if (currentPointNumber == x.length - 1) {

					currentPointNumber = 0;

				} else {

					currentPointNumber++;

				}

			}

			obj.moveToXY(x[currentPointNumber], y[currentPointNumber]);

		}

	}

	function logic() {

	}
}
