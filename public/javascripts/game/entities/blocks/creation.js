'use strict';

// Экспорт
module.exports = CreationBlock;

var EntitiesFactory = require('../../game/entities');

/**
 * Created by vaimer on 09.05.2017.
 */

function CreationBlock(spec) {

	// that / this
	var t = {};

	var unit = spec.unit;

	unit.createShuttle = createShuttle;

	return t;

	function createShuttle(player) {

		var x = unit.sprite.x;
		var y = unit.sprite.y;

		var shuttle = EntitiesFactory.createShuttle(game, x, y, player);

		shuttle.logic = shuttle.moveToXY.bind(shuttle, x - 30, y - 30);

		return shuttle;
	}
}
