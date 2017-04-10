'use strict';

var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var random = require('../../utils/random');
var UpdateManager = require('../../game/update-manager');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Created by vaimer on 31.01.17.
 */

function StateWrapper(state) {

	var t = state;

	var player;
	var graphics;	// Графика
	var sensor;		// Датчик

	t.entities = entities;
	t.logic = logic;

	return t;

	/**
	 * Логика в конкретном подуроке.
	 */
	function subLessonLogic(game) {

		if (UpdateManager.getSubIndex() > 4) {

			var cruiser = EntitiesFactory.createCruiser(game, 400, 2000);

			cruiser.sprite.rotation = -Math.PI / 2;

			moveToXYLogic(cruiser, 2020, 2500);

			var t1 = EntitiesFactory.createTransport(game, 1000, 0);
			var t2 = EntitiesFactory.createTransport(game, 1050, 0);

			moveToXYLogic(t1, 1000, 3500);
			moveToXYLogic(t2, 1050, 3500);
		}

	}

	function moveToXYLogic(spacecraft, x, y) {

		spacecraft.logic = function (h) {

			h.moveToXY(x, y);

		};

	}

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		// Инициализация графики
		graphics = game.add.graphics(0, 0);

		EntitiesFactory.createResearchCenter(game, 400, 2000);

		// Создать транспорт
		player = EntitiesFactory.createHarvester(game, 1859, 2156, true);
		player.sprite.rotation = -3.35 * Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField(game, x, y);

		var scout = EntitiesFactory.createScout(game, 2000, 2000);
		scout.sprite.rotation = 0.5 * Math.PI / 2;

		var s1 = EntitiesFactory.createScout(game, 2055, 1995);
		var s2 = EntitiesFactory.createScout(game, 2101, 1890);
		var fighter = EntitiesFactory.createFighter(game, 400, 150);

		s1.sprite.rotation = - 3.85 * Math.PI / 2;
		s2.sprite.rotation = - 4.25 * Math.PI / 2;

		patrol(s1, 2055, 1995, 2700, 1200);
		patrol(s2, 2101, 1890, 2800, 1340);
		patrol(fighter, 400, 150, 400, 3000);

		sensor = EntitiesFactory.createStaticUnit(game, 2170, 2080, 'sensor');
		sensor.sprite.visible = true;
		sensor.sprite.bringToTop();

		// Фокус на на центре
		t.followFor(player.sprite);

		// Корабль на верх.
		player.sprite.bringToTop();

		subLessonLogic(game);

		CodeLauncher.setArguments(player.api);
	}

	/**
	 * Патрулирование местности
	 * @param spacecraft корабль
	 * @param x1 координата x первой точки
	 * @param y1 координата y первой точки
	 * @param x2 координата x второй точки
	 * @param y2 координата y второй точки
	 */
	function patrol(spacecraft, x1, y1, x2, y2) {

		var x = x1;
		var y = y1;

		spacecraft.logic = function (h) {

			h.moveToXY(x, y);

			if (spacecraft.distanceTo(x1, y1) < 100) {

				x = x2;
				y = y2;

			}

			if (spacecraft.distanceTo(x2, y2) < 100) {

				x = x1;
				y = y1;

			}

		}

	}

	/**
	 * Обновление логики датчика.
	 */
	function logic() {

		if (player.api.isCargoLoad()) {

			sensor.sprite.visible = false;

		}

	}
}
