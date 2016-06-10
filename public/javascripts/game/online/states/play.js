/**
 * Created by vladthelittleone on 10.06.16.
 */
'use strict';

module.exports = PlayState;

/**
 * Состояние инициализации геймплея.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function PlayState(game) {

	var t = {};

	var cursors;
	var tileSprite;

	t.create = create;

	return t;

	/**
	 * Этап создания состояния.
	 */
	function create() {

		// Рамки мира
		var bounds = {
			x: 0,
			y: 0,
			width: 1920,
			height: 1920
		};

		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.width);

		tileSprite = game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.width, 'starField');
		tileSprite.fixedToCamera = true;

		cursors = game.input.keyboard.createCursorKeys();

	}
}
