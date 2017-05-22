'use strict';

var CodeLauncher = require('../launcher');
var EntitiesFactory = require('../entities');

module.exports = PlayState;

/**
 * Состояние инициализации геймплея.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function PlayState(game) {

	// Стандартные границы мира.
	var BOUNDS = {
		x:      0,
		y:      0,
		width:  4000,
		height: 4000
	};

	var t = {};

	var runner;				// Объект запуска кода обработки
	var cursors;			// Объект ввода / вывода
	var background;			// Спрайт фона

	t.updates = []; 		// Объекты обновления

	t.create = create;
	t.update = update;
	t.setRunner = setRunner;
	t.followFor = followFor;

	return t;

	/**
	 * Этап создания состояния.
	 */
	function create() {

		// Границы мира
		var bounds = t.bounds || BOUNDS;

		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.width);

		// Создание бэкграунда
		background = game.add.tileSprite(0, 0, game.width, game.height, 'starField');
		background.fixedToCamera = true;

		// Запуск шаблонного метода инициализации сущностей
		t.entities && t.entities(game);

		// Объект ввода / вывода
		cursors = game.input.keyboard.createCursorKeys();

	}

	/**
	 * Установка объекта обработки кода.
	 */
	function setRunner(v) {

		runner = v;

		t.updates.push(runner);

		CodeLauncher.setRunner(runner);

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		var u = [];

		// Объекты игрового мира
		var objects = EntitiesFactory.getWorld()
									 .getObjects();

		u = u.concat(objects)
			 .concat(t.updates);

		// Обновление объектов
		u.forEach(function (e) {

			e.update && e.update(e);

		});

		// Шаблонный метод,
		// для возможности обновить
		// логику с помощью обертки
		t.logic && t.logic(game);

		// Обновление background
		background.tilePosition.set(game.camera.x * -0.3, game.camera.y * -0.3);

	}

	/**
	 * Следует за объектом в заданном квадрате.
	 */
	function followFor(object) {
		var view = game.camera.view;

		var x = Math.max(object.width, 100);
		var y = Math.max(object.height, 200);

		var w = Math.round(view.halfWidth - 2 * x);
		var h = Math.round(view.height - 2 * y);

		var deadzoneCenterX = x + w / 2;
		var deadzoneCenterY = y + h / 2;

		var viewX = Math.round(object.x + view.halfWidth);
		var viewY = Math.round(object.y + view.halfHeight);

		game.camera.follow(object);
		game.camera.deadzone = new Phaser.Rectangle(x, y, w, h);
		game.camera.focusOnXY(viewX - deadzoneCenterX, viewY - deadzoneCenterY);
	}

}
