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

function LightCorvette({game, x, y, player, faction, velocity}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t = PrefabsFactory.createCustomUnit({
		game:    game,
		x:       x,
		y:       y,
		preload: 'lightCorvette',
		faction: faction
	});

	t.health = 50;
	t.maxHealth = 50;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,				// Торможение корабля
		maxVelocity:     35,				// Максимальная скорость корабля
		velocity:        velocity || 35,	// Скорость корабля
		angularVelocity: 0.3,				// Скорость разворота
		trails:          [{
			trailScale: 0.3
		}]
	});

	/**
	 * Добавляем оружие.
	 */
	t.weapon = BlocksFactory.addWeaponBlock({
		game:               game,
		unit:               t,
		faction:            faction,
		bulletKillDistance: 50
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game:  game,
		unit:  t,
		scale: 0.3
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t, player);

	t.update = update;

	return t;

	/**
	 * Обновление крейсера.
	 */
	function update() {

		t.engine.update();
		t.weapon.update();
		t.shield.update();

		t.logic && t.logic(t);

	}

}
