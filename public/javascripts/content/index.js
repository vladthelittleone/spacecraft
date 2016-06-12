'use strict';

var content = [];	// Хранит контент

// Зависимотси
content.push(require('./lesson0'));

// Экспорт
module.exports = ContentFactory();

/**
 * Фабрика контента уроков.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function ContentFactory() {

	// that / this
	var t = {};

	t.content = content;		// Метод получения контента по идентификатору

	return t;

	/**
	 * Возвращает урок под заданным номером.
	 */
	function content(id) {

		return content[id];

	}
}
