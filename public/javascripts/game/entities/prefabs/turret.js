'use strict';

module.exports = Turret;

/**
 * Created by vaimer on 16.02.17.
 */

function Turret(game, x, y) {

	var t = game.add.sprite(x, y, 'turret');

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
