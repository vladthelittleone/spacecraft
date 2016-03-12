'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var Harvester = function (spec)
{
	//===================================
	//============== INIT ===============
	//===================================

	var game = spec.game;
	var sc = game.sc;

	var that = sc.world.factory.createGameObject({
		type: sc.world.spaceCraftType
	});

	var modulesManager = that.modulesManager = ModulesManager({
		energyPoints: 4
	});

	// Стратегия, которая будет использоваться
	// для бота, либо игроква
	var strategy = spec.strategy;

	var harvestRange = spec.harvestRange;
	var maxTank = spec.maxTank;
	var harvestRate = spec.harvestRate;
	var harvestTime = 0;

	var currentMeteor = null;
	var currentTank = 0;

	// Если не заданы x, y проставляем рандомные значения мира
	// Координаты корабля (спрайта)
	var x = spec.x || game.world.randomX;
	var y = spec.y || game.world.randomY;

	// Создаем спрайт
	var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

	var isAlive = true;

	sprite.name = that.getId();

	// Центрирование
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	// Включаем проверку на коллизии с границей
	sprite.checkWorldBounds = true;

	// Подключаем физику тел к кораблю
	game.physics.p2.enable(sprite);

	//  Добавляем группу коллизий
	sprite.body.setCollisionGroup(sc.collisionGroups.spaceCraft);
	sprite.body.collides(sc.collisionGroups.bonus);

	// Поварачиваем корабль на init-угол
	!spec.angle || (sprite.body.angle = spec.angle);

	var engine = that.engine = EngineBlock({
		modulesManager: modulesManager,
		spaceCraft: that,
		game: game
	});

	var protection = that.protection = ProtectionBlock({
		sprite: sprite,
		health: spec.health,
		shield: spec.shield,
		modulesManager: modulesManager,
		spriteShield: spec.shieldSprite,
		scale: 0.5,
		game: game
	});

	//===================================
	//============== THAT ===============
	//===================================

	that.update = function ()
	{
		protection.healthRegeneration();
		protection.shieldRegeneration();

		strategy && strategy({
			spaceCraft: that,
			game: game
		});
	};

	that.changeStatus = function ()
	{
		that.live = false;
	};

	that.isAlive = function ()
	{
		return isAlive;
	};

	that.getX = function ()
	{
		return sprite.x;
	};

	that.getY = function ()
	{
		return sprite.y;
	};

	that.getAngle = function ()
	{
		return sprite.body.angle;
	};

	that.angleBetween = function (another)
	{
		var math = Phaser.Math;

		// Угол линии от точки к точке в пространстве.
		var a1 = math.angleBetween(sprite.x, sprite.y, another.getX(), another.getY()) + (Math.PI / 2);
		var a2 = math.degToRad(that.getAngle());

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

	that.distance = function (another)
	{
		var p = new Phaser.Point(another.getX(), another.getY());

		return Phaser.Point.distance(sprite, p);
	};

	that.harvest = function ()
	{
		function getMeteorInRange()
		{
			var meteors = sc.world.decorations.getMeteors();
			var res = null;

			meteors.forEach(function (m)
			{
				if (Phaser.Point.distance(sprite, m.sprite) < harvestRange)
				{
					res = m.sprite;
				}
			});

			return res;
		}

		// Проверка делэя. Не собираем каждый фрэйм.
		if (game.time.now > harvestTime && currentTank != maxTank)
		{
			if (!currentMeteor || Phaser.Point.distance(sprite, currentMeteor) > harvestRange)
			{
				currentMeteor = getMeteorInRange();
			}
			else
			{
				currentTank++;
				console.log(currentTank);
			}

			harvestTime = game.time.now + harvestRate;
		}
	};

	that.debark = function (another)
	{
		var p = new Phaser.Point(another.getX(), another.getY());

		return Phaser.Point.distance(sprite, p);
	};

	// Переносим на верхний слой, перед лазерами.
	sprite.bringToTop();

	// Добавляем наш корабль в мир
	sc.world.pushObject(that);

	return that;
};
