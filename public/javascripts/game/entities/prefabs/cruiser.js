'use strict';

module.exports = Cruiser;

/**
 * Prefab транспорта.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Cruiser(game, x, y) {

	var t = game.add.sprite(x, y, 'cruiser');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
