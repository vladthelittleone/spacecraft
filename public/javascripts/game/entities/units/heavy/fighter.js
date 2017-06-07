'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = FighterUnit;

/**
 * Created by vaimer on 04.03.2017.
 */

function FighterUnit({game, x, y, player}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.6
	 */
	t.sprite = PrefabsFactory.createCustomUnit({
		game: game,
		x: x,
		y: y,
		preload: 'fighter'
	});

	t.sprite.health = 40;
	t.sprite.maxHealth = 40;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 30,				// Торможение корабля
		velocity: 20,			// Скорость корабля
		angularVelocity: 0.2,	// Скорость разворота
		trails: [{
			trailY: -26
		}, {
			trailY: 26
		}]
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
	 * Обновление харвестра.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

	}

}
