'use strict';

// Экспорт
module.exports = CarrierBlock;

/**
 * Блок несущего корабля.
 *
 * @since 09.05.2017
 * @author Skurishin Vladislav
 */
function CarrierBlock(spec) {

	// that / this
	var t = {};

	var game = spec.game;
	var unit = spec.unit;
	var factory = spec.factory;

	unit.create = create;

	return t;

	/**
	 * Создаем носимый корабль.
	 * @param logic логика корабля.
	 * @param player указываем является ли корабль игрока.
	 * @returns {*}
	 */
	function create(logic, player) {

		var x = unit.sprite.x;
		var y = unit.sprite.y;

		// Фабричный метод. Можно передать разные фабрики, которые
		// сами определяют тип корабля.
		var corvette = factory.createCarriersShip(game, x, y, player);
		corvette.logic = logic.bind(corvette, corvette, unit);

		return corvette;
	}

}
