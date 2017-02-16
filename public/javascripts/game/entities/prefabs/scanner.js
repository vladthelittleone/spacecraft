'use strict';

module.exports = Scanner;

/**
 * Prefab метеора.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Scanner(game, x, y, n) {

	var t = new Phaser.Circle(x, y, 500);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}
