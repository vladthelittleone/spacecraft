'use strict';

// Экспорт
module.exports = Game();

/**
 * Игра.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Game() {

	// that / this
	var t = {};

	t.preload = require('./preload.json');			// Ресурсы
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
