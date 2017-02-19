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

	/**
	 * Добавляем двигатель к турели.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 0,					// Торможение корабля
		velocity: 0,				// Скорость корабля
		angularVelocity: 0.02,	// Скорость разворота
		trail: false				// Использование огня двигателя
	});

	t.update = update;

	return t;

	/**
	 * Обновление базы.
	 */
	function update() {

		t.rotateLeft();

	}
}
