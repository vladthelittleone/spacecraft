'use strict';

// Зависимости
var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var UpdateManager = require('../../game/update-manager');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	var player;		// Игрок
	var graphics;	// Графика
	var sensor;		// Датчик

	t.entities = entities;
	t.logic = logic;

	return t;

	/**
	 * Логика в конкретном подуроке.
	 */
	function subLessonLogic() {

		if (UpdateManager.getSubIndex() > 0) {

			player.sprite.x = 2000;
			player.sprite.y = 2000;
			player.sprite.rotation = 0.5 * Math.PI / 2;

		}

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
		player = EntitiesFactory.createScout(game, 1000, 1000, true);
		var sprite = player.sprite;

		sprite.rotation = -Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField(game, x, y);

		var cruiser = EntitiesFactory.createCruiser(game, 2020, 1740);

		cruiser.sprite.rotation = -Math.PI / 2;

		// Дейстивя харвестра
		cruiser.logic = function (h) {

			h.moveToXY(150, 150);

		};

		var h1 = EntitiesFactory.createHarvester(game, 1859, 2156);

		h1.sprite.rotation = -3.35 * Math.PI / 2;

		var s1 = EntitiesFactory.createScout(game, 2055, 1995);
		var s2 = EntitiesFactory.createScout(game, 2101, 1890);

		s1.sprite.rotation = -3.85 * Math.PI / 2;
		s2.sprite.rotation = -4.25 * Math.PI / 2;

		patrol(s1, 2055, 1995, 2700, 1200);
		patrol(s2, 2101, 1890, 2800, 1340);

		sensor = EntitiesFactory.createStaticUnit(game, 2170, 2080, 'sensor');
		sensor.sprite.visible = false;
		sensor.sprite.bringToTop();

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		subLessonLogic();

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

		// Если сканирование включено,
		// то появляется сдатчик.
		if (player.api.isScanningActivated()) {

			sensor.sprite.visible = true;

		}

	}
}
