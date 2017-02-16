'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');

// Экспорт
module.exports = TurretBaseUnit;

/**
 * Created by vaimer on 16.02.17.
 */

function TurretBaseUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createTurret(game, x, y);

	return t;
}
