'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');

// Экспорт
module.exports = BaseUnit;

/**
 * Объект базы.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function BaseUnit(game, x, y, preload) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createBase(game, x, y, preload);

	/**
	 * Добавляем двигатель.
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
