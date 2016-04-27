'use strict';

/**
 * @constructor
 */
var AcademyBase = function (spec)
{
	var that = {};

	var game = spec.game;
	var x = that.x = spec.x;
	var y = that.y = spec.y;

	// Добавляем спрайт метеора
	var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

	// Подключаем физику тел к бонусу
	game.physics.p2.enable(sprite);

	// Центрирование
	sprite.anchor.x = 0.8;
	sprite.anchor.y = 0.5;

	// Поварачиваем бонус на init-угол
	!spec.angle || (sprite.body.angle = spec.angle);
	spec.scale && sprite.scale.setTo(spec.scale);

	// Объявляем группу коллизий.
	var meteorCollisionGroup = game.physics.p2.createCollisionGroup();
	game.physics.p2.updateBoundsCollisionGroup();

	// Устанавливаем группу колизий
	sprite.body.setCollisionGroup(meteorCollisionGroup);

	sprite.body.collideWorldBounds = false;

	that.update = function ()
	{
		sprite.body.rotateLeft(0.1);
	};

	return that;
};
