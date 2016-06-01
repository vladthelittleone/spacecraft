/**
 * Created by vladthelittleone on 02.12.15.
 */
var EntitiesFactory = function (spec)
{
	var t = {};

	var game = spec.game;
	var world = spec.world;
	var decorations = world.decorations;

	t.createMeteors = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			decorations.pushMeteor({
				angle: game.rnd.angle(),
				x: game.world.randomX,
				y: game.world.randomY,
				scale: utils.randomInt(1, 3) * 0.25,
				speed: utils.randomInt(1, 8) * 0.1,
				spriteName: 'meteor' + utils.randomInt(1, 7),
				game: game
			});
		}
	};

	t.createMeteorField = function (args)
	{
		var R = args.radius;
		var count = args.count;
		var start = args.start;
		var shift = args.shift;

		// Создаем объект мира
		for (var y = start; y < count; y = y + shift)
		{
			var x = Math.sqrt(R * R - y * y);

			t.createMeteor({
				spriteName: 'meteor' + utils.randomInt(1, 7),
				scale: utils.randomInt(1, 3) * 0.1,
				speed: utils.randomInt(1, 8) * 0.1,
				x: x + utils.randomInt(0, 200),
				y: y + utils.randomInt(0, 200)
			});
		}
	};

	t.createMeteor = function (args)
	{
		decorations.pushMeteor({
			angle: game.rnd.angle(),
			x: args.x,
			y: args.y,
			scale: args.scale,
			speed: args.speed,
			spriteName: args.spriteName,
			game: game
		});
	};

	t.createBots = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			var modX = world.getBounds().height - 320;
			var modY = world.getBounds().width - 320;

			t.createSpaceCraft({
				strategy: args.strategy,
				x: game.world.randomX % modX + 200,
				y: game.world.randomY % modY + 200,
				spriteName: 'spaceCraft' + utils.randomInt(1, 3),
				health: args.health,
				angle: game.rnd.angle(),
				shield: args.shield
			});
		}
	};

	t.createBonus = function (args)
	{
		args.game = game;

		return Bonus(args);
	};

	t.createExplosion = function (args)
	{
		args.game = game;

		return game.sc.animationManager.explosion(args);
	};

	t.createSpaceCraft = function (args)
	{
		args.game = game;
		args.velocity = 400;
		args.beamSprite = 'greenBeam';
		args.energyPoints = 12;

		var o = SpaceCraft(args);
		o.addAllBlocks(args);

		return o;
	};

	t.createTransport = function (args)
	{
		args.game = game;
		args.scale = 1;
		args.health = 2;
		args.shield = 2;
		args.velocity = 500;
		args.energyPoints = 4;
		args.shieldScale = 0.6;

		var o = SpaceCraft(args);
		o.addEngineBlock(args);
		o.addProtectionBlock(args);

		return o;
	};

	t.createHarvester = function (args)
	{
		args.game = game;
		args.spriteName = 'harvester';
		args.health = 50;
		args.shield = 26;
		args.velocity = 500;
		args.energyPoints = 4;

		return Harvester(args);
	};

	t.createTurret = function (args)
	{
		args.game = game;
		args.spriteName = 'turret';
		args.health = 600;
		args.shield = 0;
		args.energyPoints = 10;
		args.beamSprite = 'greenBeam';

		var o = SpaceCraft(args);
		o.addWeaponBlock(args);
		o.addProtectionBlock(args);

		return o;
	};

	t.createGameObject = function (args)
	{
		args.game = game;

		return GameObject(args);
	};

	return t;
};
