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

	var cargoUnloadFlag = false;
	var cargoLoadFlag = false;
	var cX;
	var cY;

	api.isAlive = isAlive;
	api.moveForward = player.moveForward;
	api.moveToXY = moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isCargoLoad = isCargoLoad;
	api.cargoLoad = cargoLoad;
	api.cargoUnload = cargoUnload;
	api.isNearPoint = isNearPoint;
	api.isCargoUnload = isCargoUnload;

	return api;

	function cargoLoad(value) {

		if(isNearPoint(cX, cY)) {

			cargoLoadFlag = true;

			player.set(value);
		}

	}

	function moveToXY(x, y) {

		cX = x;
		cY = y;

		player.moveToXY(x, y);

	}

	function isCargoLoad() {

		return cargoLoadFlag;

	}

	function isCargoUnload() {

		return cargoUnloadFlag;

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
			cargoUnloadFlag = true;

			return player.get();
		}
	}
}
