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
	api.emp = emp;
	api.isCaught = isCaught;

	return api;

	function getDistanceToEnemy() {

		return player.distanceTo(enemy.x, enemy.y);

	}

	function emp(flag) {

		player.isEmpActivated = flag;

		if (flag) {

			player.emp();

		}

	}

	function isCaught() {

		return player.isCaught;

	}
}
