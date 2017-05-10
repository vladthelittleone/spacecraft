'use strict';

// Экспорт
module.exports = CreationBlock;

/**
 * Created by vaimer on 09.05.2017.
 */

function CreationBlock(spec) {

	// that / this
	var t = {};

	var unit = spec.unit;
	var game = spec.game;

	unit.createShuttle = createShuttle;

	return t;

	function createShuttle(player, createSpacraft) {

		var shuttle = null;

		console.log(createSpacraft);
		if(createSpacraft){

			var x = unit.sprite.x;
			var y = unit.sprite.y;

			shuttle = createSpacraft(game, x, y, player);

			shuttle.logic = shuttle.moveToXY.bind(shuttle, x - 100, y - 100);
		}

		return shuttle;
	}
}
