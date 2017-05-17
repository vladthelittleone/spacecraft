'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');

// Экспорт
module.exports = RedPlanet;

/**
 * Created by vaimer on 15.02.2017.
 */

function RedPlanet(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createBase(game, x, y);

	return t;
}
