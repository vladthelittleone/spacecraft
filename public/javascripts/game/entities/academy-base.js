'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');

// Экспорт
module.exports = AcademyBaseUnit;

/**
 * Объект базы.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function AcademyBaseUnit(game, x, y) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createAcademyBase(game, x, y);

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 0,					// Торможение корабля
		velocity: 0,				// Скорость корабля
		angularVelocity: 0.0025,	// Скорость разворота
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
