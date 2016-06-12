'use strict';

module.exports = PreloadState;

/**
 * Состояние инициализации ресурсов, картинок, аудио игры.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function PreloadState(game) {

	var t = {};

	var preloadSprite;

	t.isPreloading = true;

	t.preload = preload;
	t.create = create;
	t.update = update;

	return t;

	/**
	 *  Этап перед созданием состояния.
	 */
	function preload() {

		var centerX = game.width / 2;
		var centerY = game.height / 2;

		preloadSprite = game.add.sprite(centerX, centerY, 'preload');

		preloadSprite.anchor.setTo(0.5, 0.5);

		// когда все ресурсы будут загружены вызываем callback
		game.load.onLoadComplete.addOnce(onLoadComplete);
		game.load.setPreloadSprite(preloadSprite);

		Object.keys(t.resources).forEach(function (key) {

			game.load.image(key, t.resources[key]);

		}, t.resources);

		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);

		game.load.audio('laser1', ['audio/laser1.wav']);
		game.load.audio('explosion1', ['audio/explosion1.wav']);
		game.load.audio('explosion2', ['audio/explosion2.wav']);
		game.load.audio('shield1', ['audio/shieldvisible1.wav']);
		game.load.audio('bonus1', ['audio/bonus1.wav']);
		game.load.audio('harvest1', ['audio/harvest1.wav']);

	}

	/**
	 * Этап создания состояния.
	 */
	function create() {

		preloadSprite.cropEnabled = false;

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		// Загружаемся?
		if (!t.isPreloading) {

			// Переходим в состояние - игры
			game.state.start('play');

		}

	}

	/**
	 * При выполнении загрузки всех asset'ов
	 */
	function onLoadComplete() {

		t.isPreloading = false;

	}

}
