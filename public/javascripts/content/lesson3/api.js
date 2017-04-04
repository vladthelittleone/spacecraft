'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	// Дистанция в пределах которой работает подъем грузов
	var CARGO_DISTANCE = 30;

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
	api.cargoLoad = cargoLoad;
	api.cargoUnload = cargoUnload;
	api.isNearPoint = isNearPoint;
	api.isGetUseCargo = isGetUseCargo;

	return api;

	function cargoLoad(value) {

		if(isNearPoint(cX, cY)) {

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

	function isNearPoint(x, y) {

		return player.distanceTo(x, y) <= CARGO_DISTANCE;

	}

	function cargoUnload() {

		if(isNearPoint(cX, cY))
		{
			getCargoUse = true;

			return player.get();
		}
	}
}
