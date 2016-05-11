/**
 * Created by vladthelittleone on 02.12.15.
 */
var EntitiesFactory = function (spec)
{
	var that = {};

	var game = spec.game;
	var world = spec.world;
	var decorations = world.decorations;

	that.createMeteors = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			decorations.pushMeteor({
				angle: game.rnd.angle(),
				x: game.world.randomX,
				y: game.world.randomY,
				scale: utils.randomInt(1, 3) * 0.25,
				spriteName: 'meteor' + utils.randomInt(1, 7),
				game: game
			});
		}
	};

	that.createMeteor = function (args)
	{
		decorations.pushMeteor({
			angle: game.rnd.angle(),
			x: args.x,
			y: args.y,
			scale: args.scale,
			spriteName: args.spriteName,
			game: game
		});
	};

	that.createBots = function (args)
	{
		for (var i = 0; i < args.count; i++)
		{
			var modX = world.getBounds().height - 320;
			var modY = world.getBounds().width - 320;

			that.createSpaceCraft({
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

	that.createBonus = function (args)
	{
		args.game = game;

		return Bonus(args);
	};

	that.createExplosion = function (args)
	{
		args.game = game;

		return game.sc.animationManager.explosion(args);
	};

	that.createSpaceCraft = function (args)
	{
		args.game = game;
		args.velocity = 400;
		args.beamSprite = 'greenBeam';
		args.energyPoints = 12;

		var o = SpaceCraft(args);
		o.addAllBlocks(args);

		return o;
	};

	that.createTransport = function (args)
	{
		args.game = game;
		args.scale = 0.5;
		args.health = 2;
		args.shield = 2;
		args.velocity = 500;
		args.energyPoints = 4;

		var o = SpaceCraft(args);
		o.addEngineBlock(args);
		o.addProtectionBlock(args);

		return o;
	};

	that.createHarvester = function (args)
	{
		args.game = game;
		args.spriteName = 'harvester';
		args.health = 50;
		args.shield = 26;
		args.velocity = 500;
		args.energyPoints = 4;

		return Harvester(args);
	};

	that.createGameObject = function (args)
	{
		args.game = game;

		return GameObject(args);
	};

	return that;
};
