'use strict';

var Trail = require('./trail');

// Экспорт
module.exports = EngineBlock;

/**
 * Блок двигателя, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function EngineBlock({
	game,
	unit,
	angularVelocity,
	velocity,
	maxVelocity = velocity,
	drag,
	trails
}) {

	// that / this
	var t = {};
	var trailsArray = [];

	let stunTimer;
	let engineInStun = false;

	const STUN_DELAY = 5000; // 5 сек.

	if (trails) {

		trails.forEach(function (t) {

			var trail = Trail(game, unit, t.trailX, t.trailY, t.trailScale);

			trailsArray.push(trail);

		});

	}

	unit.moveForward = moveForward;
	unit.rotateLeft = rotateLeft;
	unit.rotateRight = rotateRight;
	unit.moveToXY = moveToXY;
	unit.getX = getX;
	unit.getY = getY;
	unit.distanceTo = distanceTo;
	unit.setVelocity = setVelocity;
	unit.getVelocity = getVelocity;

	t.update = update;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Максимальная скорось - ограничение
		unit.sprite.body.maxVelocity.set(maxVelocity);

		// Торможение
		unit.sprite.body.drag.set(drag);

	}

	/**
	 * Движение вперед.
	 */
	function moveForward() {

		useTrail();

		game.physics.arcade.velocityFromAngle(unit.sprite.angle, velocity, unit.sprite.body.velocity);

	}

	/**
	 * Движение к координатам.
	 */
	function moveToXY(x, y) {

		var distance = game.math.distance(unit.sprite.x, unit.sprite.y, x, y);

		// Если дистанция меньше 10,
		// то ничего не выполняем.
		if (distance < 10) {

			return;

		}

		useTrail();

		// Calculate the angle from the missile to the mouse cursor game.input.x
		// and game.input.y are the mouse position; substitute with whatever
		// target coordinates you need.
		var targetAngle = game.math.angleBetween(
			unit.sprite.x, unit.sprite.y,
			x, y
		);

		// Gradually (angularVelocity) aim the missile towards the target angle
		if (unit.sprite.rotation !== targetAngle) {

			// Calculate difference between the current angle and targetAngle
			var delta = targetAngle - unit.sprite.rotation;

			// Keep it in range from -180 to 180 to make the most efficient turns.
			if (delta > Math.PI) delta -= Math.PI * 2;
			if (delta < -Math.PI) delta += Math.PI * 2;

			if (delta > 0) {

				// Turn clockwise
				unit.sprite.angle += angularVelocity;

			} else {

				// Turn counter-clockwise
				unit.sprite.angle -= angularVelocity;

			}

			// Just set angle to target angle if they are close
			if (Math.abs(delta) < game.math.degToRad(angularVelocity)) {

				unit.sprite.rotation = targetAngle;

			}

		}

		// Calculate velocity vector based on rotation and velocity
		unit.sprite.body.velocity.x = Math.cos(unit.sprite.rotation) * velocity;
		unit.sprite.body.velocity.y = Math.sin(unit.sprite.rotation) * velocity;

	}

	/**
	 * Поворот влево.
	 */
	function rotateLeft() {

		useTrail();
		unit.sprite.angle -= angularVelocity;

	}

	/**
	 * Поворот вправо.
	 */
	function rotateRight() {

		useTrail();
		unit.sprite.angle += angularVelocity;

	}

	function useTrail() {

		if (!velocity) {

			return;

		}

		trailsArray.forEach(function (trail) {

			trail && trail.start();

		});

	}

	/**
	 * @returns коордианту X в пространстве
	 */
	function getX() {

		return unit.sprite.x;

	}

	/**
	 * @returns коордианту Y в пространстве
	 */
	function getY() {

		return unit.sprite.y;

	}

	/**
	 * @param _x координата x объекта, до которого считается дистанция
	 * @param _y координата y объекта, до которого считается дистанция
	 * @returns {number} дистанцию до объекта
	 */
	function distanceTo(_x, _y) {

		var deltaX = _x - unit.getX();
		var deltaY = _y - unit.getY();

		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	}

	function unstunEngine () {

		engineInStun = false;
		stunTimer.stop();

	}

	/**
	 * Функция устанавливает скорость корабля. Если новое значение скорости больше текущей на 1
	 * или пользователь пытался увеличить скорость выше максимально допустимой, то считаем
	 * что двигатель перегрелся и скорость сбрасывается до 0.
	 */
	function setVelocity(_velocity) {

		if (engineInStun) {

			// Плавное уменьшение скорости, если двигатель в стане
			if (velocity > 1) {

				velocity -= 0.3;

			}

			return;

		}

		// Ограничение ускорения и максимальной скорости.
		if ((Math.abs(_velocity - velocity) > 1) && engineInStun === false) {

			engineInStun = true;
			stunTimer = game.time.create(false);
			stunTimer.add(STUN_DELAY, unstunEngine, this);
			stunTimer.start();

			// Не выполняем изменения.
			return;

		}

		velocity = Math.min(maxVelocity, Math.max(_velocity, 0));

	}

	function getVelocity() {

		return velocity;

	}

	/**
	 * Обновление двигателя.
	 */
	function update() {

	}
}
