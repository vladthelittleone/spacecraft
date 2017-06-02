'use strict';

// Экспорт
module.exports = Quiz();

/**
 * Quiz 2
 *
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */
function Quiz() {

	// that / this
	var t = {};

	t.preload = require('../lesson0/preload.json');	// Ресурсы
	t.lessonContent = require('./lesson-content');	// Контент урока
	t.state = require('../lesson0/state');			// Обертка вокруг игрового состояния

	return t;

}
