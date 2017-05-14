'use strict';

// Зависимости
var EngineBlock = require('./engine');
var ShieldBlock = require('./shield');
var ScannerBlock = require('./scanner');
var CargoBlock = require('./cargo');
var FactoryBlock = require('./factory');

// Экспорт
module.exports = BlocksFactory();

/**
 * Фабрика prefab'ов.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function BlocksFactory() {

	// that / this
	var t = {};

	/**
	 * Добавляем дигатель к юниту.
	 */
	t.addEngineBlock = EngineBlock;
	/**
	 * Добавляем щит к юниту.
	 */
	t.addShieldBlock = ShieldBlock;
	/**
	 * Добавляем сканер к юниту.
	 */
	t.addScannerBlock = ScannerBlock;
	/**
	 * Добавляем грузовой отсек к юниту.
	 */
	t.addCargoBlock = CargoBlock;
	/**
	 * Добавляем блок создания к юниту.
	 */
	t.addFactoryBlock = FactoryBlock;

	return t;

}
