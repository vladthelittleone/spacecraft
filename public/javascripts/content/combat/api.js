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
	api.fireAtXY = player.fireAtXY;
	api.moveForward = player.moveForward;
	api.scan = player.scan;

	return api;

	function isAlive() {

		return player.sprite.alive;

	}

}
