'use strict';

/**
 * Зависимости.
 */
var StatesFactory = require('./states');
var ContentFactory = require('../content');

// Экспорт
module.exports = Game;

/**
 * Модуль создания игры опредленного типа.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Game(id) {

	// that / this
	var t = {};

	t.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-canvas');

	t.destroy = destroy;

	initialization();

	return t;

	/**
	 * Инициализация состояний
	 */
	function initialization() {

		var content = ContentFactory.content(id);

		// Игровые состояния
		StatesFactory.createBootState(t.phaser, 'boot');
		StatesFactory.createPreloadState(t.phaser, 'preload', content.preload);
		StatesFactory.createWrappedPlayState(t.phaser, 'play', content.state);

		// Стартуем boot состояние.
		t.phaser.state.start('boot');
	}

	/**
	 * Очистка кэша, памяти.
	 */
	function destroy() {

		t.phaser.destroy();

	}

}
