'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');

// Экспорт
module.exports = TransportUnit;

/**
 * Объект транспорта.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function TransportUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createTransport(game, x, y);

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,	// Торможение корабля
		angularDrag:     20,	// Торможение поворота
		velocity:        60,	// Скорость корабля
		angularVelocity: 15		// Скорость разворота
	});

	t.update = update;

	return t;

	/**
	 * Обновление транспорта.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}
}
