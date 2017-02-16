'use strict';

// Зависимости
var PrefabsFactory = require('../prefabs');

// Экспорт
module.exports = ScannerBlock;

/**
 * Блок сканера, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function ScannerBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;
	var scale = spec.scale || 1;

	/**
	 * Создаем спрайт щита.
	 */
	var shieldSprite = PrefabsFactory.createShield(game, 0, 0, scale, unit.isPlayer);

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Привязываем спрайт щита к кораблю
		unit.sprite.addChild(shieldSprite);

	}
}
