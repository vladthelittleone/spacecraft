'use strict';

// Экспорт
module.exports = WarpEffectBlueAnimation();

/**
 * Анимация синего варп эффекта.
 */
function WarpEffectBlueAnimation() {

	// that / this
	let t = {};
	let warpEffects; // Группа анимации.
	let game;		 // Игра.

	t.initialization = initialization;
	t.play = play;

	return t;

	/**
	 * Инициализация анимации синего варп эффекта.
	 *
	 * @param _game
	 */
	function initialization(_game) {

		game = _game;

		// Группа анимации взрыва
		warpEffects = game.add.group();
		warpEffects.createMultiple(8, 'warpEffectBlue');
		warpEffects.forEach(initializeExplosion, this);

	}

	/**
	 * Инициализация варп эффекта.
	 */
	function initializeExplosion(warpEffect) {

		warpEffect.anchor.x = 0.5;
		warpEffect.anchor.y = 0.5;
		warpEffect.animations.add('warpEffectBlue');

	}

	/**
	 * Обновление базы.
	 */
	function play({x, y, angle, scale}) {

		let warpEffect = warpEffects.getFirstExists(false);

		warpEffect.scale.setTo(scale || 1);
		warpEffect.angle = angle;
		warpEffect.reset(x, y);
		warpEffect.play('warpEffectBlue', 30, false, true);

	}

}
