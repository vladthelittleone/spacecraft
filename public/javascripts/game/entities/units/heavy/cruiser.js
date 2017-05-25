'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = CruiserUnit;

/**
 * Объект крузера.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function CruiserUnit(game, x, y, player) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit(game, x, y, 'cruiser');
	t.sprite.health = 100;
	t.sprite.maxHealth = 100;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            10,					// Торможение корабля
		velocity:        20,					// Скорость корабля
		angularVelocity: 0.1,					// Скорость разворота
		trails: [ {
			trailY: -10,
			trailX: 17
		}, {
			trailY: 10,
			trailX: 17
		} ]
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game: game,
		unit: t,
		scale: 0.9
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
