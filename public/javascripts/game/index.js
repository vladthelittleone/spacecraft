'use strict';

/**
 * Зависимости.
 */
var StatesFactory = require('./states');
var ContentFactory = require('../content');
var EntitiesFactory = require('./entities');
var CodeLauncher = require('./launcher');

// Экспорт
module.exports = Game();

/**
 * Модуль создания игры опредленного типа.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Game() {

	// that / this
	var t = {};

	t.content = ContentFactory;		// Фабрика контента уроков
	t.world = EntitiesFactory;		// Фабрика мира и объектов
	t.codeLauncher = CodeLauncher;	// Синглтон заупска кода

	t.destroy = destroy;
	t.initialization = initialization;
	t.restart = restart;

	return t;

	/**
	 * Инициализация состояний
	 */
	function initialization(id) {

		t.phaser = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO, 'game-canvas');

		// Выполняем инициализацию контейнера игровых объектов.
		EntitiesFactory.initialization();

		var content = ContentFactory.content(id);

		// Игровые состояния
		StatesFactory.createBootState(t.phaser, 'boot');
		StatesFactory.createPreloadState(t.phaser, 'preload', content.preload);
		StatesFactory.createWrappedPlayState(t.phaser, 'play', content.state);

		// Стартуем boot состояние.
		t.phaser.state.start('boot');
	}

	/**
	 * Рестарт уже существующей игры.
	 */
	function restart() {

		// Выполняем инициализацию контейнера игровых объектов.
		EntitiesFactory.initialization();

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
