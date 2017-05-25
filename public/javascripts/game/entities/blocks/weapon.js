'use strict';

// Экспорт
module.exports = WeaponBlock;

/**
 * Блок оружия, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function WeaponBlock(spec) {

	// that / this
	let t = {};

	let fireRate = spec.fireRate || 1000;
	let bulletSpeed = spec.bulletSpeed || 200;
	let offsetX = spec.offsetX;
	let offsetY = spec.offsetY;
	let quantity = spec.quantity || 30;
	let bulletKillDistance = spec.range || 200;

	let game = spec.game;
	let unit = spec.unit;
	let weapon = game.add.weapon(quantity, 'beam1');

	unit.fire = fire;

	initialization();

	return t;

	/**
	 * Инициализация оружия у корабля.
	 */
	function initialization() {

		//  The bullet will be automatically killed when it leaves the camera bounds
		weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;

		// Дистанция, при которой пуля будет уничтожена.
		weapon.bulletKillDistance = bulletKillDistance;

		//  The speed at which the bullet is fired
		weapon.bulletSpeed = bulletSpeed;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		weapon.fireRate = fireRate;

		//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		weapon.trackSprite(unit.sprite, offsetX, offsetY);

		unit.sprite.bringToTop();

	}

	function fire () {

		weapon.fire();

	}

}
