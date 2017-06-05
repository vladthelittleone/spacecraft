'use strict';

// Экспорт
module.exports = ExplosionAnimation();

/**
 * Анимация взрыва.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function ExplosionAnimation() {

	// that / this
	let t = {};
	let explosions; // Группа анимации.
	let game;		// Игра.

	t.initialization = initialization;
	t.play = play;

	return t;

	/**
	 * Инициализация анимации взрыва.
	 *
	 * @param _game
	 */
	function initialization(_game) {

		game = _game;

		// Группа анимации взрыва
		explosions = game.add.group();
		explosions.createMultiple(10, 'explosion');
		explosions.forEach(initializeExplosion, this);

	}

	/**
	 * Инициализация взрывов.
	 */
	function initializeExplosion(explosion) {

		explosion.anchor.x = 0.5;
		explosion.anchor.y = 0.5;
		explosion.animations.add('explosion');

	}

	/**
	 * Обновление базы.
	 */
	function play({x, y, scale}) {

		var explosion = explosions.getFirstExists(false);

		explosion.scale.setTo(scale || 1);
		explosion.reset(x, y);
		explosion.play('explosion', 30, false, true);

	}

}
