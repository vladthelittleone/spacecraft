'use strict';

// Зависимости
let PrefabsFactory = require('../../prefabs');
let EMP = require('./emp');

// Экспорт
module.exports = ShieldBlock;

/**
 * Блок щита, который может быть добавлен к кораблю.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function ShieldBlock({game, unit, scale = 1, empMaxDiameter, color}) {

	// that / this
	let t = {};

	/**
	 * Электромагнитный импульс.
	 */
	let emp = EMP({
		game: game,
		unit: unit,
		maxDiameter: empMaxDiameter,
		color: color
	});

	/**
	 * Создаем спрайт щита.
	 */
	let shieldSprite = PrefabsFactory.createShield(game, 0, 0, scale, unit.isPlayer);

	t.update = update;

	unit.emp = emp.start;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		// Привязываем спрайт щита к кораблю
		unit.addChild(shieldSprite);

	}

	/**
	 * Обновление.
	 */
	function update() {

		emp.update();

	}

}
