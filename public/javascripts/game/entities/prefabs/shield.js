'use strict';

module.exports = Shield;

/**
 * Prefab щита.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Shield(game, x, y, scale, player) {

	// Если это корабль игрока, то спрайт зеленый
	var spriteName = player ? 'userShield' : 'shield';

	var t = game.make.sprite(x, y, spriteName);

	// Центрирование
	t.anchor.x = 0.5;
	t.anchor.y = 0.5;
	t.alpha = 0.2;

	scale && t.scale.setTo(scale);

	return t;

}
