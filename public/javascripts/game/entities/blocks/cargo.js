'use strict';

// Экспорт
module.exports = CargoBlock;

var lodash = require('lodash');

/**
 * Блок грузовго отсека на корабле
 * (небольшая реализация,  для урока с переменными)
 *
 * Created by vaimer on 16.02.17.
 */

function CargoBlock(spec) {

	// that / this
	var t = {};

	var unit = spec.unit;

	var cargoContainer;

	unit.set = set;
	unit.get = get;
	unit.isEmpty = isEmpty;

	initialization();

	return t;

	/**
	 * Инициализация.
	 */
	function initialization() {

		cargoContainer = 'Пусто';

	}

	/**
	 * Положить переменную в хранилище.
	 */
	function set(value) {

		cargoContainer = value;

	}

	/**
	 * Получить переменную из хранилища.
	 */
	function get() {

		return cargoContainer;

	}

	/**
	 * Проревка хранилища ну пустоту.
	 */
	function isEmpty() {

		return lodash.isEqual('Пусто', cargoContainer)
	}
}
