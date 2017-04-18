'use strict';

module.exports = Fighter;

/**
 * Created by vaimer on 04.03.2017.
 */

function Fighter(game, x, y) {

	var t = game.add.sprite(x, y, 'fighter');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
