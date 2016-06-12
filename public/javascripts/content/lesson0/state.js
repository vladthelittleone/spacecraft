'use strict';

var EntitiesFactory = require('../../game/entities');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
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

		// Создание транспорта.
		var player = EntitiesFactory.createTransport(game, game.world.centerX, game.world.centerY);

		t.setPlayer(player);

		// Фокус на объекте транспорта.
		game.camera.focusOn(player.sprite);

	}
}
