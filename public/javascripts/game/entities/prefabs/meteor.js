'use strict';

module.exports = Meteor;

/**
 * Prefab метеора.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Meteor(game, x, y, n) {

	var t = game.add.sprite(x, y, 'meteor' + n);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
