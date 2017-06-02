'use strict';

// Экспорт
module.exports = WeaponBlock;

var World = require('../world');
var AnimationFactory = require('../../animations');

/**
 * Блок оружия, который может быть добавлен к кораблю.
 *
 * @param fireRate период одного выстрела
 * @param game игра
 * @param unit юнит
 * @param bulletSpeed скорость пули
 * @param quantity кол-во пуль в корабле
 * @param bulletKillDistance дистанция полета пули
 * @param offsetX офсет относительно корабля по X
 * @param offsetY офсет относительно корабля по Y
 * @param damage урон оружия
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function WeaponBlock({
	game,
	unit,
	fireRate = 1000,
	bulletSpeed = 200,
	damage = 10,
	quantity = 30,
	bulletKillDistance = 200,
	offsetX,
	offsetY
}) {

	// that / this
	let t = {};

	let weapon = game.add.weapon(quantity, 'beam1');

	unit.fire = fire;

	t.update = update;

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

	function fire() {

		weapon.fireAngle = unit.sprite.angle;
		weapon.fire();

	}

	function update() {

		var groups = World.getFactionEnemyGroups(unit.faction);

		game.physics.arcade.overlap(weapon.bullets, groups, hitEnemy, null, t);

	}

	function hitEnemy(bullet, enemy) {

		bullet.kill();
		enemy.damage(damage);

		AnimationFactory.playExplosion({
			x: bullet.body.x,
			y: bullet.body.y,
			scale: 0.1
		});

	}

}
