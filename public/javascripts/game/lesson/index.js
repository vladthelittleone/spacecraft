'use strict';

// Экспорт
module.exports = LessonGame;

/**
 * Модуль создания игры для урока.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function LessonGame(lessonId) {

	// that / this
	var t = {};

	t.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-canvas');

	return t;

}
