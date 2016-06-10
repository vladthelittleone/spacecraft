'use strict';

/**
 * Зависимости.
 */
var OnlineGame = require('./online');

// Экспорт
module.exports = Game();

/**
 * Модуль создания игры опредленного типа.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Game() {

	var t = {};

	t.createLessonGame = createLessonGame;
	t.createOnlineGame = createOnlineGame;

	return t;

	function createLessonGame() {

		//

	}

	function createOnlineGame() {

		return OnlineGame();

	}

}
