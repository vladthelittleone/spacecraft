'use strict';

module.exports = Shield;

/**
 * Prefab щита.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Shield(game, x, y, scale, player) {

	// Если это корабль игрока, то спрайт зеленый
	var spriteName = player ? 'userShield' : 'shield';

	var t = game.make.sprite(x, y, spriteName);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;

	scale && t.scale.setTo(scale);

	return t;

}
