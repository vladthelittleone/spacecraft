'use strict';

module.exports = AcademyBase;

/**
 * Prefab базы академии.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function AcademyBase(game, x, y) {

	var t = game.add.sprite(x, y, 'base');

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
