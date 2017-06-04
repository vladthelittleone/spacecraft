'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = LightCorvette;

/**
 * Объект корвета.
 *
 * Created by vaimer on 09.05.2017.
 */

function LightCorvette({game, x, y, player}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit(game, x, y, 'lightCorvette');
	t.sprite.health = 10;
	t.sprite.maxHealth = 20;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game: game,
		unit: t,
		drag: 10,				// Торможение корабля
		velocity: 20,			// Скорость корабля
		angularVelocity: 0.3,	// Скорость разворота
		trails: [{
			trailScale: 0.3
		}]
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
