'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');

// Экспорт
module.exports = Mine;

/**
 * Объект мины.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function Mine(game, x, y, scale) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createMine(game, x, y, scale);

	return t;
}
