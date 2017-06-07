'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	var api = {};

	var trueCaptain = false;
	var fireAlreadyUsed = false;

	api.moveToXY = player.moveToXY;
	api.fire = player.fire;
	api.isAlive = isAlive;
	api.setOwner = setOwner;
	api.isTrueCaptain = isTrueCaptain;
	api.log = log;
	api.destroy = destroy;
	api.fireAtXY = fireAtXY;
	api.isFireAlreadyUsed = isFireAlreadyUsed;

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

	function fireAtXY(x, y) {

		fireAlreadyUsed = true;

		player.fireAtXY(x, y);

	}

	function isFireAlreadyUsed() {

		return fireAlreadyUsed;

	}
}
