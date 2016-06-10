'use strict';

module.exports = BootState;

/**
 * Состояние инициализации физики и других компонент игры.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function BootState(game) {

	var t = {};

	t.preload = preload;
	t.create = create;

	return t;

	/**
	 *  Этап перед созданием состояния.
	 */
	function preload() {

		game.load.image('preload', 'images/sprites/preload.png');

	}

	/**
	 * Этап создания состояния.
	 */
	function create() {

		// Оптимизация
		if (game.renderType ===  Phaser.CANVAS) {

			game.renderer.clearBeforeRender = false;
			game.renderer.roundPixels = true;

			console.info("CANVAS");

		}

		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;

		// Автомасштабирование окна игры
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Переходим в состояние предзагрузки ресурсов
		game.state.start('preload');

	}

}
