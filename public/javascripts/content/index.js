'use strict';

var contentArray = [];	// Хранит контент

// Зависимотси
contentArray.push(require('./lesson0'));
contentArray.push(require('./lesson1'));
contentArray.push(require('./lesson2'));
contentArray.push(require('./quiz0'));

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

		return contentArray[id];

	}
}
