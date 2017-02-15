'use strict';

module.exports = RedPlanet;

/**
 * Created by vaimer on 15.02.2017.
 */

function RedPlanet(game, x, y) {

	var t = game.add.sprite(x, y, 'redplanet');

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
