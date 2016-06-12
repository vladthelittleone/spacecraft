'use strict';

// Экспорт
module.exports = EngineBlock;

/**
 * Блок двигателя, который может быть добавлен к кораблю.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function EngineBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;

	var angularVelocity = spec.angularVelocity;
	var velocity = spec.velocity;
	var drag = spec.drag;

	unit.moveForward = moveForward;
	unit.rotateLeft = rotateLeft;
	unit.rotateRight = rotateRight;

	t.update = update;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Торможение
		unit.sprite.body.drag.set(drag);

		// Максимальная скорось - ограничение
		unit.sprite.body.maxVelocity.set(velocity);

	}

	/**
	 * Движение вперед.
	 */
	function moveForward() {

		game.physics.arcade.velocityFromAngle(unit.sprite.angle, velocity, unit.sprite.body.velocity);

	}

	/**
	 * Поворот влево.
	 */
	function rotateLeft() {

		unit.sprite.body.angularVelocity = -angularVelocity;

	}

	/**
	 * Поворот вправо.
	 */
	function rotateRight() {

		unit.sprite.body.angularVelocity = angularVelocity;

	}

	/**
	 * Обновление двигателя.
	 */
	function update() {

		unit.sprite.body.velocity.x = 0;
		unit.sprite.body.velocity.y = 0;
		unit.sprite.body.angularVelocity = 0;

	}
}
