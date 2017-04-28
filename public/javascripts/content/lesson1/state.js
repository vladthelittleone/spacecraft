'use strict';

// Зависимости
var EntitiesFactory = require('../../game/entities');
var CodeLauncher = require('../../game/launcher');
var Random = require('../../utils/random');

var Api = require('./api');

module.exports = StateWrapper;

/**
 * Оболочка вокруг PlayState, ввоящая конентент урока 0.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function StateWrapper(state) {

	var t = state;

	var explosions;	// Группа анимации взрывов
	var player;		// Игрок
	var mines; 		// Мины

	var mineXY;		// Координаты мин

	t.entities = entities;
	t.logic = logic;

	return t;

	/**
	 * Шаблонный метод инфициализации объектов.
	 */
	function entities(game) {

		var x = game.world.centerX;
		var y = game.world.centerY;

		EntitiesFactory.createResearchCenter(game, 400, 2000);

		// Создать транспорт
		player = EntitiesFactory.createTransport(game, x, y, true);
		var sprite = player.sprite;

		sprite.rotation = - Math.PI / 2;

		// API для урока
		player.api = Api(player);

		// Создать метеоритное поле
		EntitiesFactory.createMeteorField(game, x, y);

		mineField(game, x, y);

		// Корабль на верх.
		sprite.bringToTop();

		// Фокус на на центре
		t.followFor(sprite);

		CodeLauncher.setArguments(player.api);

	}

	/**
	 * Создание минного поля.
     */
	function mineField(game) {
		// Создать минное поле
		mineXY = new Phaser.Point(1100, 1100);

		// Создаем группу из мин
		mines = game.add.group();

		for (var i = 0; i < 10; i++)
		{
			var deltaY = Random.randomOf(-1, 1) * 20 * i;
			var deltaX = Random.randomOf(-1, 1) * 20 * i;

			EntitiesFactory.createMine(game, mineXY.x + deltaX, mineXY.y - deltaY, 0.15, mines);
		}

		// Группа анимации взрыва
		explosions = game.add.group();
		explosions.createMultiple(10, 'explosion');
		explosions.forEach(initExplosion, this);

	}

	/**
	 * Инициализация взрывов.
     */
	function initExplosion (explosion) {

		explosion.anchor.x = 0.5;
		explosion.anchor.y = 0.5;
		explosion.animations.add('explosion');

	}

	/**
	 * Обновление логики минного поля.
     */
	function logic(game) {

		// В случае близкого положения мин,
		// летим к кораблю
		if (Phaser.Point.distance(mineXY, player.sprite) < 100) {

			mines.forEach(function (e) {

				if (!player.sprite.alive) {

					// Если игрок погиб, мины
					// прекращают движение.
					e.body.velocity.x = 0;
					e.body.velocity.y = 0;

				} else {

					game.physics.arcade.moveToObject(e, player.sprite, 100);

					// При пересечении обрабатываем в overlapHandler
					game.physics.arcade.overlap(player.sprite, e, overlapHandler);

				}

			});

		}

	}

	/**
	 * Обработка пересечений.
	 */
	function overlapHandler(transport, mine) {

		// Наносим два урона
		transport.damage(2);

		var explosion = explosions.getFirstExists(false);

		explosion.scale.setTo(0.5);
		explosion.reset(transport.body.x, transport.body.y);
		explosion.play('explosion', 30, false, true);

		player.audio.playExplosion();

		mine.kill();

	}

}
