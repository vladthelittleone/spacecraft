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

	api.isAlive = isAlive;
	api.moveForward = player.moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isUseCargo = isUseCargo;
	api.setToCargo = setToCargo;

	return api;

	function setToCargo(value) {

		cargoUse = true;

		player.set(value);
	}

	function isUseCargo() {

		return cargoUse;
	}

	function isAlive() {

		return player.sprite.alive;

	}

}
