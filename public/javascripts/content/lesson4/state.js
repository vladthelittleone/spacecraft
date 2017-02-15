'use strict';

var EntitiesFactory = require('../../game/entities');
var random = require('../../utils/random');

module.exports = StateWrapper;

/**
 * Created by vaimer on 31.01.17.
 */

function StateWrapper(state) {

	var t = state;

	t.entities = entities;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		var base = EntitiesFactory.createAcademyBase(game, x, y);

	}
}
