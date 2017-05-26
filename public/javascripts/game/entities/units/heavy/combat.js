'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');

// Экспорт
module.exports = CombatUnit;

/**
 * Объект корабля сражений.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function CombatUnit({game, x, y, player, preload, faction}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createCustomUnit(game, x, y, preload);
	t.sprite.health = 150;
	t.sprite.maxHealth = 150;
	t.faction = faction;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            10,					// Торможение корабля
		velocity:        15,					// Скорость корабля
		angularVelocity: 0.15,					// Скорость разворота
		trails: [ {
			trailY: -3,
			trailScale: 0.1
		}, {
			trailY: 3,
			trailScale: 0.1
		}, {
			trailY: -18
		}, {
			trailY: 18
		} ]
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game: game,
		unit: t,
		scale: 0.7
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
	 * Обновление.
	 */
	function update() {

		t.engine.update();
		t.weapon.update();

		t.logic && t.logic(t);

	}

}
