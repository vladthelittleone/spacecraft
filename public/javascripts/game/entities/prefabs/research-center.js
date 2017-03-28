'use strict';

module.exports = ResearchCenter;

/**
 * Created by vaimer on 16.02.17.
 */

function ResearchCenter(game, x, y) {

	var t = game.add.sprite(x, y, 'researchCenter');

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	t.width = 600;
	t.height = 600;
	game.physics.arcade.enableBody(t);

	return t;

}
