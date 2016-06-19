'use strict';

module.exports = Mine;

/**
 * Prefab мины.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Mine(game, x, y, scale) {

	var t = game.add.sprite(x, y, 'mine');

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	scale && t.scale.setTo(scale);

	return t;

}
