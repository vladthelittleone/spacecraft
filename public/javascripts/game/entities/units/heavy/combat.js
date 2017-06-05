'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var BlocksFactory = require('../../blocks');
var GameAudioFactory = require('../../../audio');
var AnimationFactory = require('../../../animations');
var Random = require('../../../../utils/random');
var World = require('../../world');

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
	t.sprite = PrefabsFactory.createCustomUnit({game, x, y, preload, faction});
	t.sprite.health = 150;
	t.sprite.maxHealth = 150;

	/**
	 * Коллбеки.
	 */
	t.sprite.events.onKilled.add(onKillCallback, this);

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            10,					// Торможение корабля
		velocity:        15,					// Скорость корабля
		angularVelocity: 0.15,					// Скорость разворота
		trails:          [{
			trailY:     -3,
			trailScale: 0.1
		}, {
			trailY:     3,
			trailScale: 0.1
		}, {
			trailY: -18
		}, {
			trailY: 18
		}]
	});

	/**
	 * Добавляем щиты.
	 */
	t.shield = BlocksFactory.addShieldBlock({
		game:  game,
		unit:  t,
		scale: 0.7
	});

	/**
	 * Добавляем оружие.
	 */
	t.weapon = BlocksFactory.addWeaponBlock({
		game:    game,
		unit:    t
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

	/**
	 * Логика уничтожения корабля.
	 */
	function onKillCallback() {

		var x = t.sprite.x;
		var y = t.sprite.y;

		AnimationFactory.playExplosions([{
				   x,
				   y,
			scale: 0.5
		}, {
			x:     x + Random.randomInt(10, 50),
			y:     y + Random.randomInt(10, 50),
			scale: Math.random()
		}, {
			x:     x + Random.randomInt(10, 50),
			y:     y + Random.randomInt(10, 50),
			scale: Math.random()
		}]);

		// Удаляем объект из мира.
		World.removeObject(t);

		// Играем аудио взрыва.
		t.audio.playExplosion();
	}

}
