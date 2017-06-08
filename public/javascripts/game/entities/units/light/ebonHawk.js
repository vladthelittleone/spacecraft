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
	t.sprite = PrefabsFactory.createCustomUnit({
												   game: game,
												   x: x,
												   y: y,
												   preload: 'ebonHawk'
											   });
	t.sprite.health = 10;
	t.sprite.maxHealth = 10;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,	// Торможение корабля
		maxVelocity:     60,	// Максимальная скорость корабля
		velocity:        velocity || 60,
		angularVelocity: 0.5,	// Скорость разворота
		trails:          [{
			trailScale: 0.5
		}]
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t.sprite, player);

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
