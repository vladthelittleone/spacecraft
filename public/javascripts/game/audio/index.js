'use strict';

// Экспорт
module.exports = GameAudioFactory;

/**
 * Фабрика звуков спрайта.
 */
function GameAudioFactory(game, sprite, player) {

	var t = {};

	t.playLaser = playLaser;
	t.playExplosion = playExplosion;
	t.playSmallExplosion = playSmallExplosion;
	t.playDestructionShield = playDestructionShield;
	t.playTakeBonus = playTakeBonus;
	t.playHarvest = playHarvest;
	t.playWarpEffect = playWarpEffect;

	return t;

	function play(audioName, min, max) {

		var volume;

		volume = player ? max : min;

		if (volume > 0 && sprite.inCamera) {

			var audio = game.add.audio(audioName);

			audio.volume = volume;

			audio.play();

		}

	}

	function playLaser() {

		play('laser1', 0.01, 0.015);

	}

	function playExplosion() {

		play('explosion', 0.05, 0.2);

	}

	function playSmallExplosion () {

		play('explosion', 0.001, 0.005);

	}

	function playDestructionShield () {

		play('shield1', 0, 0.01);

	}

	function playTakeBonus () {

		play('bonus1', 0, 0.03);

	}

	function playHarvest () {

		play('harvest1', 0.01, 0.01);

	}

	function playWarpEffect () {

		play('warpEffect', 0.05, 1);

	}

}

