'use strict';

// Зависимости
var Runner = require('./runner');

var PlayState = require('./play');
var BootState = require('./boot');
var PreloadState = require('./preload');

// Экспорт
module.exports = StatesManager();

/**
 * Фабрика сущностей.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function StatesManager() {

	// that / this
	var t = {};

	t.createRunnerState = createRunnerState;
	t.createBootState = createBootState;
	t.createPreloadState = createPreloadState;
	t.createPlayState = createPlayState;

	return t;

	/**
	 * Состояние игры с обработкой кода.
	 */
	function createRunnerState(game, key, autoStart) {

		// Состояние
		var state = game.state.add(key, PlayState, autoStart);

		// Объект запуска кода
		var runner = Runner(game);

		// Добавляем состояние.
		state.setRunner(runner);

		return state;

	}

	/**
	 * Состояние игры с обработкой кода.
	 */
	function createPlayState(game, key, autoStart) {

		return game.state.add(key, PlayState, autoStart);

	}

	/**
	 * Состояние загрузки физики и игры.
	 */
	function createBootState(game, key, autoStart) {

		return game.state.add(key, BootState, autoStart);

	}

	/**
	 * Состояние загрузки ресурсов.
	 */
	function createPreloadState(game, key, autoStart) {

		return game.state.add(key, PreloadState, autoStart);

	}

}
