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

		//base = AcademyBase({
		//	game: game,
		//	x: game.world.centerX,
		//	y: game.world.centerY,
		//	spriteName: 'base'
		//});

		// Создание транспорта.
		var transport = EntitiesFactory.createTransport(game, game.world.centerX, game.world.centerY);

		transport.logic = function (h) {

			h.moveForward();
			h.rotateRight();

		};

		for (var i = 0; i < 3; i++)
		{
			var i1 = random.randomInt(-200, 200);
			var i2 = random.randomInt(-200, 200);

			var harvester = EntitiesFactory.createHarvester(game, x + i1, y + i2);

			// Рандомный угол
			harvester.sprite.angle = game.rnd.angle();

			// Дейстивя харвестра
			harvester.logic = function (h) {

				h.moveForward();
				h.rotateLeft();

			}
		}

		// Фокус на на центре.
		game.camera.focusOnXY(x, y);

	}
}
