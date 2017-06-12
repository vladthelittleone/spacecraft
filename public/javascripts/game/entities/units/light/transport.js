'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = TransportUnit;

/**
 * Объект транспорта.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function TransportUnit({game, x, y, player, velocity}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createCustomUnit({
		game:    game,
		x:       x,
		y:       y,
		preload: 'transport'
	});

	t.health = 10;
	t.maxHealth = 10;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,	// Торможение корабля
		maxVelocity:     45,	// Максимальная скорость корабля
		velocity:        velocity || 45,
		angularVelocity: 0.5,	// Скорость разворота
		trails:          [{
			trailScale: 0.5
		}]
	});

	t.cargo = BlocksFactory.addCargoBlock({
		unit: t
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t, player);

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
