'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	api.selfDestruction = selfDestruction;
	api.isAlive = isAlive;

	return api;

	function selfDestruction() {

		player.sprite.kill();

	}

	function isAlive() {

		return player.sprite.alive;

	}
}
