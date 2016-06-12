'use strict';

var CodeLauncher = require('../launcher');

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

	t.updates = []; 		// Объекты обновления

	t.getPlayer = getPlayer;
	t.setPlayer = setPlayer;
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

		// Запуск шаблонного метода инициализации сущностей
		t.entities && t.entities(game);

		// Добавление аргументов для объекта обработки кода.
		runner && runner.setArguments(player);

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

		// Обновление объектов
		t.updates.forEach(function (e)
		{

			e.update && e.update();

		});

	}

	/**
	 * Возвращаем игрока.
	 */
	function getPlayer() {

		return player;
	}

	/**
	 * Устанавливаем игрока.
	 */
	function setPlayer(v) {

		player = v;

		t.updates.push(player);

	}

}
