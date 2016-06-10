'use strict';

/**
 * Зависимости.
 */
var BootState = require('./states/boot');
var PreloadState = require('./states/preload');
var PlayState = require('./states/play');

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
	t.phaser.state.add('boot', BootState);
	t.phaser.state.add('preload', PreloadState);
	t.phaser.state.add('play', PlayState);

	t.phaser.state.start('boot');

	return t;

}
