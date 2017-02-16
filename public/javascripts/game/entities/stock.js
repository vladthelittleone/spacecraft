'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');

// Экспорт
module.exports = StockBaseUnit;
/**
 * Created by vaimer on 16.02.17.
 */

function StockBaseUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createStock(game, x, y);

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 0,					// Торможение корабля
		velocity: 0,				// Скорость корабля
		angularVelocity: 0.0030,	// Скорость разворота
		trail: false				// Использование огня двигателя
	});

	t.update = update;

	return t;

	/**
	 * Обновление базы.
	 */
	function update() {

		t.rotateRight();

	}
}
