'use strict';

module.exports = Stock;

/**
 * Created by vaimer on 16.02.17.
 */

function Stock(game, x, y) {

	var t = game.add.sprite(x, y, 'stock');

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
