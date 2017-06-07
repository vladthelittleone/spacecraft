'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');

// Экспорт
module.exports = Planet;

/**
 * Created by vaimer on 15.02.2017.
 */
function Planet({game, x, y, preload}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createBase({game, x, y, preload});

	/**
	 * Добавляем двигатель.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            0,
		velocity:        0,			// Скорость корабля
		angularVelocity: 0.003,
		trail:           false
	});


	t.update = update;

	return t;

	/**
	 * Обновление планеты.
	 */
	function update() {

		t.rotateLeft();

	}
}
