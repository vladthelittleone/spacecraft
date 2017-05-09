'use strict';

module.exports = Shuttle;

/**
 * Created by vaimer on 09.05.2017.
 */

function Shuttle(game, x, y) {

	var t = game.add.sprite(x, y, 'shuttle');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
