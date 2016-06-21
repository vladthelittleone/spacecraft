'use strict';

module.exports = Harvester;

/**
 * Prefab транспорта.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Harvester(game, x, y) {

	var t = game.add.sprite(x, y, 'harvester');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
