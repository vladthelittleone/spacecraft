'use strict';

var Explosion = require('./explosion');

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

}
