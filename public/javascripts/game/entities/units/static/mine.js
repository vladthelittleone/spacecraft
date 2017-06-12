'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');

// Экспорт
module.exports = Mine;

/**
 * Объект мины.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Mine({game, x, y, scale, group}) {

	/**
	 * Создаем спрайт.
	 */
	return PrefabsFactory.createMine(game, x, y, scale, group);

}
