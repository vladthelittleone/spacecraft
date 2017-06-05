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

function LightCorvette({game, x, y, player, faction}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit({
		game: game,
		x: x,
		y: y,
		preload: 'lightCorvette',
		faction: faction
	});

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
	 * Добавляем оружие.
	 */
	t.weapon = BlocksFactory.addWeaponBlock({
		game: game,
		unit: t,
		faction: faction
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
		t.weapon.update();

		t.logic && t.logic(t);

	}

}
