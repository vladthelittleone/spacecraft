'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var GameAudioFactory = require('../../../audio');
var BlocksFactory = require('../../blocks');
var AnimationFactory = require('../../../animations');
var Random = require('../../../../utils/random');
var World = require('../../world');

// Экспорт
module.exports = BaseUnit;

/**
 * Объект базы.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function BaseUnit({game, x, y, preload, faction}) {

	// that / this
	let t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createBase({game, x, y, preload, faction});
	t.sprite.health = 1000;
	t.sprite.maxHealth = 1000;

	/**
	 * Коллбеки.
	 */
	t.sprite.events.onKilled.add(onKillCallback, this);

	/**
	 * Добавляем двигатель.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            0,			// Торможение корабля
		velocity:        0,			// Скорость корабля
		angularVelocity: 0.0025,	// Скорость разворота
		trail:           false		// Использование огня двигателя
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t.sprite);


	t.update = update;

	return t;

	/**
	 * Обновление базы.
	 */
	function update() {

		t.rotateLeft();

	}

	/**
	 * Логика уничтожения корабля.
	 */
	function onKillCallback() {

		var x = t.sprite.x;
		var y = t.sprite.y;

		AnimationFactory.playExplosions([{
			x,
			y
		}, {
			x:     x + Random.randomInt(10, 50),
			y:     y + Random.randomInt(10, 50),
			scale: Math.random()
		}, {
			x:     x + Random.randomInt(10, 100),
			y:     y + Random.randomInt(10, 100),
			scale: Math.random()
		}, {
			x:     x + Random.randomInt(10, 100),
			y:     y + Random.randomInt(10, 100),
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
