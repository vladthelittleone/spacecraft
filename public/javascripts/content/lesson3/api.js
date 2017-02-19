'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 *
 * @param player
 */
function Api(player) {

	var api = {};

	var cargoUse = false;
	var cargoX;
	var cargoY;

	api.isAlive = isAlive;
	api.moveForward = player.moveForward;
	api.moveToXY = moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isUseCargo = isUseCargo;
	api.setToCargo = setToCargo;
	api.getFromCargo = player.get;
	api.isWithinCargo = isWithinCargo;

	return api;

	function setToCargo(value) {

		if(isWithinCargo()) {

			cargoUse = true;

			player.set(value);
		}

	}

	function moveToXY(x, y) {

		cargoX = x;
		cargoY = y;

		player.moveToXY(x, y);

	}

	function isUseCargo() {

		return cargoUse;
	}

	function isAlive() {

		return player.sprite.alive;

	}

	function isWithinCargo() {

		var distance = Phaser.Point.distance(new Phaser.Point(cargoX, cargoY),
											 new Phaser.Point(player.sprite.x, player.sprite.y));

		return distance <= 7;
	}
}
