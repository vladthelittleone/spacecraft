'use strict';

module.exports = Base;

/**
 * Prefab базы.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Base({
	game,
	x,
	y,
	preload,
	faction,
	anchorX,
	anchorY,
	scale
}) {

	var t = game.add.sprite(x, y, preload);

	t.faction = faction;

	// Центрирование
	t.anchor.x = anchorX || 0.8;
	t.anchor.y = anchorY || 0.5;

	// Масштабируем
	scale && t.scale.setTo(scale);

	game.physics.arcade.enableBody(t);

	return t;

}
