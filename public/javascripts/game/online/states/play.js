'use strict';

var EntitiesFactory = require('../../entities');
var CodeLauncher = require('../../launcher');

module.exports = PlayState;

/**
 * Состояние инициализации геймплея.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function PlayState(game) {

	var t = {};

	var runner;				// Объект запуска кода обработки
	var player;				// Объект управления
	var cursors;			// Объект ввода / вывода
	var background;			// Спрайт фона

	var updates = []; 		// Объекты обновления

	t.getPlayer = getPlayer;
	t.create = create;
	t.update = update;
	t.setRunner = setRunner;

	return t;

	/**
	 * Этап создания состояния.
	 */
	function create() {

		// Рамки мира
		var bounds = {
			x:      0,
			y:      0,
			width:  1920,
			height: 1920
		};

		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.width);

		// Создание бэкграунда
		background = game.add.tileSprite(0, 0, game.width, game.height, 'starField');
		background.fixedToCamera = true;

		// Создание транспорта.
		player = EntitiesFactory.createTransport(game, game.world.centerX, game.world.centerY);

		// Добавление аргументов для объекта обработки кода.
		runner && runner.setArguments(player);

		// Фокус на объекте транспорта.
		game.camera.focusOn(player.sprite);

		// Объект ввода / вывода
		cursors = game.input.keyboard.createCursorKeys();

	}

	/**
	 * Установка объекта обработки кода.
	 */
	function setRunner(v) {

		runner = v;

		updates.push(runner);

		CodeLauncher.setRunner(runner);

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		// Обновление объектов
		updates.forEach(function (e)
		{

			e.update();

		});

	}

	/**
	 * Возвращаем игрока.
	 */
	function getPlayer() {

		return player;
	}

}
