'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	var trueCaptain = false;

	api.destroy = destroy;
	api.isAlive = isAlive;
	api.setOwner = setOwner;
	api.isTrueCaptain = isTrueCaptain;
	api.log = log;
	api.destroy = player.sprite.kill;

	return api;

	function isAlive() {

		return player.sprite.alive;

	}

	function log() {

		return 'Прочность: ' + player.sprite.health + '<br> Статус: К.О.';

	}

	function setOwner(owner) {

		trueCaptain = (owner === 'Кадет');

	}

	function isTrueCaptain() {

		return trueCaptain;

	}
}
