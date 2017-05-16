'use strict';

// Экспорт
module.exports = FactoryBlock;

/**
 * Created by vaimer on 09.05.2017.
 */

function FactoryBlock(spec) {

	// that / this
	var t = {};

	var unit = spec.unit;
	var game = spec.game;

	var PARENT_SHIP_DISTANCE = 200;

	unit.createShuttle = createShuttle;

	return t;

	function createShuttle(player, createSpaceCraft) {

		var shuttle = null;

		if(createSpaceCraft){

			var x = unit.sprite.x;
			var y = unit.sprite.y;

			shuttle = createSpaceCraft(game, x, y, player);

			shuttle.logic = function() {

				if(shuttle.distanceTo(x, y) <= PARENT_SHIP_DISTANCE) {

					shuttle.moveForward();

				}
			};
		}

		return shuttle;
	}

}
