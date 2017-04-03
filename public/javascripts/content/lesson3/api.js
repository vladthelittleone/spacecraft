'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	// Дистанция в пределах которой работает подъем грузов
	var CARGO_DISTANCE = 10;

	var api = {};

	var getCargoUse = false;
	var cargoUse = false;
	var cX;
	var cY;

	api.isAlive = isAlive;
	api.moveForward = player.moveForward;
	api.moveToXY = moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isUseCargo = isUseCargo;
	api.loadToCargo = loadToCargo;
	api.getFromCargo = getFromCargo;
	api.isWithinDote = isWithinCargo;
	api.isGetUseCargo = isGetUseCargo;

	return api;

	function loadToCargo(value) {

		if(isWithinCargo()) {

			cargoUse = true;

			player.set(value);
		}

	}

	function moveToXY(x, y) {

		cX = x;
		cY = y;

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

	function isWithinCargo() {

		return player.distanceTo(cX, cY) <= CARGO_DISTANCE;

	}

	function getFromCargo() {

		if(isWithinCargo())
		{
			getCargoUse = true;

			return player.get();
		}
	}
}
