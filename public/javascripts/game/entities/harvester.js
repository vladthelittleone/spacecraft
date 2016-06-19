'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');

// Экспорт
module.exports = HarvesterUnit;

/**
 * Объект харвестра.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function HarvesterUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createHarvester(game, x, y);

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 30,				// Торможение корабля
		angularDrag: 1,			// Торможение поворота
		velocity: 20,			// Скорость корабля
		angularVelocity: 5		// Скорость разворота
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game: game,
		unit: t,
		scale: 0.4
	});

	t.update = update;

	return t;

	/**
	 * Обновление харвестра.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}

}
