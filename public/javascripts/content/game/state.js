'use strict';

var EntitiesFactory = require('../../game/entities');
var random = require('../../utils/random');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	t.entities = entities;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var base = EntitiesFactory.createAcademyBase(game, x, y);

	}
}
