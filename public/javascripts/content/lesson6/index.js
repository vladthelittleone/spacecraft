'use strict';

// Экспорт
module.exports = Lesson();

function Lesson() {

	// that / this
	var t = {};

	t.preload = require('./preload.json');			// Ресурсы
	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('./state');					// Обертка вокруг игрового состояния

	return t;

}
