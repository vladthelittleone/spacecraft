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

	api.isAlive = isAlive;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.fire = player.fire;
	api.moveForward = player.moveForward;

	return api;

	function isAlive() {

		return player.sprite.alive;

	}

}
