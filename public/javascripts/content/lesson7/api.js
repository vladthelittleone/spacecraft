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

	api.isAlive = isAlive;
	api.setOwner = setOwner;
	api.isTrueCaptain = isTrueCaptain;
	api.log = log;
	api.destroy = destroy;
	api.fire = fire;
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

	function fire() {

		player.moveToXY(1500, 1500);

		if(player.distanceTo(1500, 1500) <= 50) {

			fireAlreadyUsed = true;

			player.fire();

		}
	}

	function isFireAlreadyUsed() {

		return fireAlreadyUsed;

	}
}
