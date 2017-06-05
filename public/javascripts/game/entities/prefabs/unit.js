'use strict';

module.exports = Unit;

/**
 * Prefab корабля.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Unit({game, x, y, preload, scale, faction}) {

	var t = game.add.sprite(x, y, preload);

	// Фракция.
	t.faction = faction;

	// Центрирование.
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	scale && t.scale.setTo(scale);

	game.physics.arcade.enableBody(t);

	t.body.collideWorldBounds = true;

	return t;

}
