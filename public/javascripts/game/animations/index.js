'use strict';

var Explosion = require('./explosion');
var WarpEffectBlue = require('./warpEffectBlue');

// Экспорт
module.exports = AnimationsFactory();

/**
 * Фабрика анимаций.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function AnimationsFactory() {

	// that / this
	let t = {};
	let game;

	t.initialization = initialization;
	t.playExplosion = playExplosion;
	t.playExplosions = playExplosions;
	t.playWarpEffectBlue = playWarpEffectBlue;

	return t;

	/**
	 * Инициализация группы анимации.
	 *
	 * @param _game
	 */
	function initialization(_game) {

		game = _game;

		// Анимации взрыва.
		Explosion.initialization(game);
		WarpEffectBlue.initialization(game);

	}

	/**
	 * Анимация взрыва.
	 */
	function playExplosion(args) {

		Explosion.play(args);

	}

	/**
	 * Анимации взрыва.
	 */
	function playExplosions(explosions) {

		explosions.forEach(Explosion.play);

	}

	/**
	 * Анимация синего варп эффекта
	 */
	function playWarpEffectBlue (args) {

		WarpEffectBlue.play(args);

	}

}
