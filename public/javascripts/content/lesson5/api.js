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
	api.getDistanceToEnemy = getDistanceToEnemy;
	api.activateEMP = activateEMP;
	api.isEMPAvailable = isEMPAvailable;

	return api;

	function getDistanceToEnemy () {

		return player.distanceTo(enemy.sprite.x, enemy.sprite.y);

	}

	function activateEMP(flag) {

		player.isEMPActivated = flag;

	}

	function isEMPAvailable () {

		return player.distanceTo(enemy.sprite.x, enemy.sprite.y) < 100 && player.isEMPActivated;

	}
}
