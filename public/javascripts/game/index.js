'use strict';

/**
 * Зависимости.
 */
var StatesManager = require('./states');
var ContentFactory = require('../content');
var EntitiesFactory = require('./entities');
var CodeLauncher = require('./launcher');
var UpdateManager = require('./update-manager');

// Экспорт
module.exports = Game();

/**
 * Модуль создания игры опредленного типа.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Game() {

	// that / this
	var t = {};

	t.content = ContentFactory;		// Фабрика контента уроков
	t.world = EntitiesFactory;		// Фабрика мира и объектов
	t.codeLauncher = CodeLauncher;	// Синглтон заупска кода
	t.updateManager = UpdateManager;// Менеджер обновления

	t.destroy = destroy;
	t.initialization = initialization;
	t.restart = restart;

	return t;

	/**
	 * Инициализация состояний
	 */
	function initialization(id, successCallback) {

		t.phaser = new Phaser.Game(window.screen.width, window.screen.height, Phaser.CANVAS, 'game-canvas');

		// Выполняем инициализацию контейнера игровых объектов.
		EntitiesFactory.initialization();

		var content = ContentFactory.content(id);

		// Игровые состояния
		StatesManager.createBootState(t.phaser, 'boot');
		var preloadState = StatesManager.createPreloadState(t.phaser, 'preload', content.preload);
		StatesManager.createWrappedPlayState(t.phaser, 'play', content.state);

		// Стартуем boot состояние.
		t.phaser.state.start('boot');

		// Если из вне определили коллбэк обработки окончания загрузки игры.
		successCallback && preloadState.setSuccessfulCallback(successCallback);

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
