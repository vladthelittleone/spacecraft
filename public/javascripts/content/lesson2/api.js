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
	var isScanning = false;

	api.isScanningActivated = isScanningActivated;
	api.scan = scan;
	api.moveForward = player.moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.getX = player.getX;
	api.getY = player.getY;
	api.distanceTo = player.distanceTo;

	return api;

	function scan() {

		isScanning = true;

		player.scan();

	}

	function isScanningActivated() {

		return isScanning;

	}

}
