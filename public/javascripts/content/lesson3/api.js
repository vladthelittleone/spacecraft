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

	return api;

	function setToCargo(value) {

		console.log('in cargo');
		console.log(player.sprite.x / 10);
		console.log(player.sprite.y / 10);
		if(player.sprite.x == cargoX &&
		   player.sprite.y == cargoY) {

			console.log('in if');

			cargoUse = true;

			player.set(value);
		}

	}

	function moveToXY(x, y) {

		cargoX = x;
		cargoY = y;

		player.moveToXY(x, y);

		console.log('cargoX = ' + cargoX);
		console.log('cargoY = ' + cargoY);
	}

	function isUseCargo() {

		return cargoUse;
	}

	function isAlive() {

		return player.sprite.alive;

	}

}
