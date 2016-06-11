'use strict';

/**
 * Зависимости.
 */
var StatesFactory = require('./states');

// Экспорт
module.exports = OnlineGame;

/**
 * Модуль создания игры для онлайна.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function OnlineGame() {

	// that / this
	var t = {};

	t.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-canvas');

	// Игровые состояния
	StatesFactory.createPreloadState(t.phaser, 'preload');
	StatesFactory.createRunnerState(t.phaser, 'play');

	// Стартуем boot состояние.
	StatesFactory.createBootState(t.phaser, 'boot', true);

	return t;

}
