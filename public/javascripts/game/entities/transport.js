'use strict';

// Зависимости
var PrefabsFactory = require('./prefabs');
var BlocksFactory = require('./blocks');
var GameAudioFactory = require('../audio');
var SpaceCraftTrail = require('./SpaceCraftTrail');

// Экспорт
module.exports = TransportUnit;

/**
 * Объект транспорта.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function TransportUnit(game, x, y, player) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createTransport(game, x, y);
	t.sprite.health = 10;
	t.sprite.maxHealth = 10;

	/**
	 * Добавляем двигатель к кораблю.
	 */
	t.engine = BlocksFactory.addEngineBlock({
		game:            game,
		unit:            t,
		drag:            120,	// Торможение корабля
		velocity:        60,	// Скорость корабля
		angularVelocity: 0.5	// Скорость разворота
	});

	/**
	 * Аудио менеджер.
	 */
	t.audio = GameAudioFactory(game, t.sprite, player);

	// t.emitter = game.add.emitter(t.sprite.x, t.sprite.y, 400);
	// t.emitter.gravity = 200;
	// t.emitter.setAlpha(1, 0, 3000);
	// //t.emitter.setScale(0.8, 0, 0.8, 0, 3000);
	// t.emitter.setXSpeed(0, 0);
	// t.emitter.setYSpeed(-80, -50);
    //
	// t.emitter.makeParticles('fire');
    //
	// t.emitter.start(false, 3000, 50);

	t.trail = SpaceCraftTrail(game, t);

	t.update = update;

	return t;

	/**
	 * Обновление транспорта.
	 */
	function update() {

		t.engine.update();

		t.logic && t.logic(t);

		// t.emitter.x = t.sprite.x;
		// t.emitter.y = t.sprite.y;

		t.trail.update();
	}

}
