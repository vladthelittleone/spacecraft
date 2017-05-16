'use strict';

module.exports = PreloadState;

/**
 * Состояние инициализации ресурсов, картинок, аудио игры.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function PreloadState(game) {

	var t = {};

	var onSuccessful;

	t.isPreloading = true;

	t.preload = preload;
	t.create = create;
	t.update = update;
	t.setSuccessfulCallback = setSuccessfulCallback;

	return t;

	function setSuccessfulCallback(callback) {

		onSuccessful = callback;

	}

	/**
	 *  Этап перед созданием состояния.
	 */
	function preload() {

		var centerX = game.width / 2;
		var centerY = game.height / 2;

		// когда все ресурсы будут загружены вызываем callback
		game.load.onLoadComplete.addOnce(onLoadComplete);

		Object.keys(t.resources).forEach(function (key) {

			game.load.image(key, t.resources[key]);

		}, t.resources);

		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);

	}

	/**
	 * Этап создания состояния.
	 */
	function create() {

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

		onSuccessful && onSuccessful();

	}

}
