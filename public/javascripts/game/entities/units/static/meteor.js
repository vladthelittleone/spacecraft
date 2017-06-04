'use strict';

// Зависимости
var PrefabsFactory = require('../../prefabs');
var Random = require('../../../../utils/random');

// Экспорт
module.exports = Meteor;

/**
 * Объект метеора.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function Meteor({game, x, y}) {

	// that / this
	var t = {};

	/**
	 * Создаем спрайт.
	 */
	t.sprite = PrefabsFactory.createMeteor(game, x, y, Random.randomInt(1, 7));

	return t;
}
