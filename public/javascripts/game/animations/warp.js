'use strict';

// Экспорт
module.exports = WarpEffect();

/**
 * Анимация варп эффекта.
 */
function WarpEffect() {

	// that / this
	let t = {};
	let warpGroup; // Группа анимации.
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
		warpGroup = game.add.group();
		warpGroup.createMultiple(8, 'warpEffectBlue');
		warpGroup.forEach(initializeExplosion, this);

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

		let warpEffect = warpGroup.getFirstExists(false);

		warpEffect.scale.setTo(scale || 1);
		warpEffect.angle = angle;
		warpEffect.reset(x, y);
		warpEffect.play('warpEffectBlue', 30, false, true);

	}

}
