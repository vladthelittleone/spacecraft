'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = EbonHawk;

/**
 * Объект EbonHawk.
 */
function EbonHawk({game, x, y, player, velocity}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createCustomUnit({
		game:    game,
		x:       x,
		y:       y,
		preload: 'ebonHawk'
	});

	t.health = 100;
	t.maxHealth = 100;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,				// Торможение корабля
		maxVelocity:     50,				// Максимальная скорость корабля
		velocity:        velocity || 50,
		angularVelocity: 0.5,				// Скорость разворота
		trails:          [{
			trailScale: 0.5
		}]
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
