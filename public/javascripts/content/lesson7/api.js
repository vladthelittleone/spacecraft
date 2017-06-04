'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	var trueCaptain = false;
	var useFire = false;

	api.isAlive = isAlive;
	api.setOwner = setOwner;
	api.isTrueCaptain = isTrueCaptain;
	api.log = log;
	api.destroy = destroy;
	api.fire = fire;
	api.isUseFire = isUseFire;

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

	function setOwner(owner) {

		trueCaptain = (owner === 'Кадет');

	}

	function isTrueCaptain() {

		return trueCaptain;

	}

	function fire() {

		useFire = true;

		player.fire();

	}

	function isUseFire() {

		return useFire;
	}
}
