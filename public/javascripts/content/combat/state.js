'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	t.entities = entities;

	// Границы
	t.bounds = {
		x:      0,
		y:      0,
		width:  2000,
		height: 2000
	};

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var bounds = game.world.bounds;
		var height = bounds.height;
		var width = bounds.width;

		EntitiesFactory.createBase(game, height - 300, 300, 'combatBase');
		EntitiesFactory.createBase(game, 300, width - 300, 'combatBase');

		// Создать транспорт
		var player = EntitiesFactory.createCombat(game, 1000, 1000, true, 'combat1');
		var sprite = player.sprite;

		sprite.rotation = -Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Фокус на базе
		t.followFor(player.sprite);

		CodeLauncher.setArguments(player.api);
	}
}
