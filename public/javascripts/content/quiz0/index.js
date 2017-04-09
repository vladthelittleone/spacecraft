'use strict';

// Экспорт
module.exports = Quiz();

/**
 * Урок 0.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Quiz() {

	// that / this
	var t = {};

	t.preload = require('./preload.json');	// Ресурсы
	t.questions = require('./questions.js');		// Вопросы
	t.state = require('./state');			// Обертка вокруг игрового состояния

	return t;

}
