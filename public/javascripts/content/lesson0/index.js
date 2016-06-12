'use strict';

// Экспорт
module.exports = Lesson();

/**
 * Урок 0.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Lesson() {

	// that / this
	var t = {};

	t.preload = require('./preload.json');
	t.lessonContent = require('./lesson-content');
	t.state = require('./state');

	return t;

}
