'use strict';

module.exports = Stun;

/**
 * Менеджеров станов.
 *
 * @author Skurishin Vladislav
 * @since 13.07.16
 */
function Stun({game, stunDelay}) {

	let t = {};

	let stunTimer;
	let stunned = false;

	t.isStunned = isStunned;
	t.start = start;

	return t;

	/**
	 * Стан.
	 */
	function start() {

		// Если стан уже был.
		// Ничего не делаем.
		if (stunned) {

			return;

		}

		stunned = true;
		stunTimer = game.time.create(true);
		stunTimer.start();
		stunTimer.add(stunDelay, stop, this);

	}

	/**
	 * Выход из стана.
	 */
	function stop() {

		stunned = false;
		stunTimer.stop();

	}

	/**
	 * Находиться ли объект в стане?
	 */
	function isStunned() {

		return stunned;

	}

}
