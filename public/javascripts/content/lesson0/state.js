'use strict';

var EntitiesFactory = require('../../game/entities');
var random = require('../../utils/random');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	t.entities = entities;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		var base = EntitiesFactory.createAcademyBase({
 			game: game,
			x: x,
			y: y
		});

		for (var h = 0; h < 5; h++) {

			var i1 = random.randomInt(-225, 225);
			var i2 = random.randomInt(-225, 225);

			// Рандомим тип корабля
			var type = random.random() ? EntitiesFactory.createTransport : EntitiesFactory.createHarvester;

			var spacecraft = type({
		  		game: game,
				x: x + i1,
		  		y: y + i2
			});

			// Рандомный угол
			spacecraft.sprite.angle = game.rnd.angle();

			// Дейстивя харвестра
			spacecraft.logic = function (h) {

				h.moveForward();
				h.rotateLeft();

			}

		}

		// Фокус на на центре.
		game.camera.focusOnXY(x + (base.sprite.width / 4), y);

	}
}
