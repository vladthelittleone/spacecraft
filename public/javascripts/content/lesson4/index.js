'use strict';

// Экспорт
module.exports = Quiz();

/**
 * Quiz 1
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Quiz() {

	// that / this
	var t = {};

	t.preload = require('../lesson0/preload.json');	// Ресурсы
	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('../lesson0/state');			// Обертка вокруг игрового состояния

	return t;

}
