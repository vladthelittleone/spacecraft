'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');

// Экспорт
module.exports = RedPlanetBaseUnit;

/**
 * Created by vaimer on 15.02.2017.
 */

function RedPlanetBaseUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createRedPlanet(game, x, y);

	return t;
}
