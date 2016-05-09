'use strict';

/**
 * @constructor
 */
var Unit = function (spec)
{
	var t = {};

	t.game = spec.game;

	// Если не заданы x, y проставляем рандомные значения мира
	// Координаты спрайта
	var x = spec.x || t.game.world.randomX;
	var y = spec.y || t.game.world.randomY;

	// Добавляем спрайт
	t.sprite = t.game.add.sprite(x, y, spec.spriteName);

	// Включаем проверку на коллизии с границей
	t.sprite.checkWorldBounds = spec.checkWorldBounds;

	// Центрирование
	t.sprite.anchor.x = spec.anchX || 0.5;
	t.sprite.anchor.y = spec.anchY || 0.5;

	// Устанавливаем scale
	spec.scale && t.sprite.scale.setTo(spec.scale);

	// Подключаем физику тел
	t.game.physics.p2.enable(t.sprite);

	// Поварачиваем на init-угол
	spec.angle && (t.sprite.body.angle = spec.angle);

	t.getX = function ()
	{
		return t.sprite.x;
	};

	t.getY = function ()
	{
		return t.sprite.y;
	};

	t.getAngle = function ()
	{
		return t.sprite.body.angle;
	};

	t.angleBetween = function (another)
	{
		var math = Phaser.Math;

		// Угол линии от точки к точке в пространстве.
		var a1 = math.angleBetween(t.x, t.y, another.getX(), another.getY()) + (Math.PI / 2);
		var a2 = math.degToRad(t.getAngle());

		a1 = math.normalizeAngle(a1);
		a2 = math.normalizeAngle(a2);

		a1 = math.radToDeg(a1);
		a2 = math.radToDeg(a2);

		var m1 = (360 - a1) + a2;
		var m2 = a1 - a2;

		if (m1 < m2)
		{
			return -m1;
		}
		else
		{
			return m2;
		}
	};

	t.distance = function (another)
	{
		var p = new Phaser.Point(another.getX(), another.getY());

		return Phaser.Point.distance(t.sprite, p);
	};

	return t;
};
