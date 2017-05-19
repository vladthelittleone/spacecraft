'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	api.destroy = destroy;
	api.isAlive = isAlive;
	api.log = log;

	return api;

	function destroy() {

		player.sprite.kill();

	}

	function isAlive() {

		return player.sprite.alive;

	}

	function log() {

		return 'Прочность: ' + player.sprite.health + '<br> Статус: К.О.';

	}
}
