'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player, enemy) {

	let api = {};

	api.moveForward = player.moveForward;
	api.setVelocity = player.setVelocity;
	api.getVelocity = player.getVelocity;
	api.getDistanceToTheDrone = getDistanceToTheDrone;
	api.activateHackDevice = activateHackDevice;
	api.isHackAvailable = isHackAvailable;

	return api;

	function getDistanceToTheDrone () {

		return player.distanceTo(enemy.sprite.x, enemy.sprite.y);

	}

	function activateHackDevice(flag) {

		player.isHackDeviceActivated = flag;

	}

	function isHackAvailable () {

		return player.distanceTo(enemy.sprite.x, enemy.sprite.y) < 100 && player.isHackDeviceActivated;

	}
}
