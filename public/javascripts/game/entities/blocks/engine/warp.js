'use strict';

var AnimationFactory = require('../../../animations');

/**
 * @author Skurishin Vladislav
 * @since 13.07.16
 */
module.exports = Warp;

function Warp({spaceCraft, warpScale = 0.5}) {

	let t = {};

	// Флаг необходимый для контроля
	// невидимости.
	let changeAlpha = false;

	t.play = play;
	t.update = update;

	return t;

	/**
	 * Вход в варп режима.
	 */
	function play() {

		spaceCraft.alpha = 0;

		AnimationFactory.playWarpEffect({
			x: spaceCraft.x,
			y: spaceCraft.y,
			angle: spaceCraft.angle + 90,
			scale: warpScale
		});

		spaceCraft.audio.playWarpEffect();

		changeAlpha = true;

	}

	/**
	 * Обновление инвиза перед варпом.
	 */
	function update() {

		if (changeAlpha) {

			// Постепенный выход из инвиза.
			if (spaceCraft.alpha < 1) {

				spaceCraft.alpha += 0.05;

			} else {

				changeAlpha = false;

			}

		}

	}

}
