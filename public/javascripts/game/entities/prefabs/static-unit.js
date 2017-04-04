'use strict';

module.exports = Scout;

/**
 * Prefab разведчика.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Scout(game, x, y, preload, scale) {

	var t = game.add.sprite(x, y, preload);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	scale && t.scale.setTo(scale);

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
