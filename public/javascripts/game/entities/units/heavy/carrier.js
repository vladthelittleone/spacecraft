'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');


// Экспорт
module.exports = CarrierUnit;

/**
 * Объект крейсера
 *
 * Created by vaimer on 09.05.2017.
 */

function CarrierUnit(game, factory, x, y, player) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit(game, x, y, 'carrier');
	t.sprite.health = 200;
	t.sprite.maxHealth = 400;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 300,				// Торможение корабля
		velocity: 40,			// Скорость корабля
		angularVelocity: 0.2,	// Скорость разворота
		trail: true				// Использование огня двигателя
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game: game,
		unit: t,
		scale: 2.8
	});

	/**
	 * Добавляем блок создания объектов.
	 */
	t.creation = BlocksFactory.addCarrierBlock({
	    factory: factory,
		game: game,
		unit: t,
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t.sprite, player);

	t.update = update;

	return t;

	/**
	 * Обновление крейсера.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}

}
