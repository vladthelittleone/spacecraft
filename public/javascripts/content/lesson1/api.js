'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 *
 * @param player
 */
function Api (player) {

	var api = {};

	var moveForwardCalled = false;

	api.moveForward = moveForward;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.isMoveForwardCalled = isMoveForwardCalled;

	function moveForward() {

		player.moveForward();

		moveForwardCalled = true;

	}

	function isMoveForwardCalled()
	{

		return moveForwardCalled;

	}

	return api;
}
