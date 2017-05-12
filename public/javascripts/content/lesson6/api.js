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
	api.log = log;

	return api;

	function selfDestruction() {

		player.sprite.kill();

	}

	function isAlive() {

		return player.sprite.alive;

	}

	function log() {

		return 'Health:' + player.sprite.health + '/n State: OK';

	}
}
