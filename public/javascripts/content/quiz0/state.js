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

		var base = EntitiesFactory.createAcademyBase(game, x, y);

		game.time.events.add(Phaser.Timer.SECOND * 4, createSpaceShip, this);

		// Фокус на на центре.
		game.camera.focusOnXY(x + (base.sprite.width / 4), y);

		function createSpaceShip() {

			function checkCoord(curentCoord, coord, raz) {

				return curentCoord >= (coord - raz) &&
					   curentCoord <= (coord + raz)

			}

			// Рандомим тип корабля
			var type = random.random() ? EntitiesFactory.createTransport : EntitiesFactory.createHarvester;

			var spacecraft = type(game, x - 160, y);

			// Рандомный угол
			spacecraft.sprite.angle = game.rnd.angle();

			// Дейстивя харвестра
			spacecraft.logic = function (h) {

				var hx = x + 200;
				var hy = y + 200;

				var missionComplete = false;

				if(!missionComplete &&
					checkCoord(h.sprite.x, hx, 50) &&
					checkCoord(h.sprite.y, hy, 50)) {

					missionComplete = true;

					console.log("complete");

				}

				if(!missionComplete) {

					h.moveToXY(hx, hy);

				}

				if(missionComplete) {

					h.moveToXY(x, y);

				}

			}

		}

	}

}
