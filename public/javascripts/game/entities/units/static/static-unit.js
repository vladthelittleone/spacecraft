'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');

// Экспорт
module.exports = StaticUnit;

/**
 * Объект разведчика.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function StaticUnit({game, x, y, preload, scale, faction}) {

	// that / this
	var t = {};

	if (!preload) {

		return;

	}

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit({game, x, y, preload, scale, faction});

	t.update = update;

	return t;

	/**
	 * Обновление юнита.
	 */
	function update() {

		t.logic && t.logic(t);

	}

}
