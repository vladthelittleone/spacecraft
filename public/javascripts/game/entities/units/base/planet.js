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
	t = PrefabsFactory.createBase({
		game: game,
		x: x,
		y: y,
		preload: preload,
		anchorX: 0.5,
		scale: 0.5
	});

	/**
	 * Добавляем двигатель.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            0,
		velocity:        0,			// Скорость корабля
		angularVelocity: 0.001,
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
