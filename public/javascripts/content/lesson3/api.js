'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	var getCargoUse = false;
	var cargoUse = false;
	var cargoX;
	var cargoY;

	api.isAlive = isAlive;
	api.moveForward = player.moveForward;
	api.moveToXY = moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isUseCargo = isUseCargo;
	api.loadToCargo = loadToCargo;
	api.getFromCargo = getFromCargo;
	api.isWithinDote = isWithinDote;
	api.isGetUseCargo = isGetUseCargo;

	return api;

	function loadToCargo(value) {

		if(isWithinDote(cargoX, cargoY)) {

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

	function isGetUseCargo() {

		return getCargoUse;
	}

	function isAlive() {

		return player.sprite.alive;

	}

	function isWithinDote(x, y) {

		var distance = Phaser.Point.distance(new Phaser.Point(x, y),
											 new Phaser.Point(player.sprite.x, player.sprite.y));

		return distance <= 7;

	}

	function getFromCargo() {

		if(isWithinDote(cargoX, cargoY))
		{
			getCargoUse = true;

			return player.get();
		}
	}
}
