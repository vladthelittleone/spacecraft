'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState0 = function (spec)
{
	var that = PlayState(spec);

	var game = spec.game;
	var sc = game.sc;
	var base = {};

	var followFor = that.followFor;
	var gameInit = that.gameInit;

	//===================================
	//============== CYCLE ==============
	//===================================

	that.create = function ()
	{
		gameInit(sc.world.getBounds());
		that.entitiesInit();
		followFor(base.sprite);
	};

	that.update = function ()
	{
		if (!game.paused)
		{
			base.update();
			sc.world.update();
		}
	};

	that.entitiesInit = function ()
	{
		var factory = sc.world.factory;

		base = AcademyBase({
			game: game,
			x: game.world.centerX,
			y: game.world.centerY,
			spriteName: 'base',
			scale: 1
		});

		for (var i = 0; i < 3; i++)
		{
			factory.createHarvester({
				x: game.world.centerX + game.world.randomX % 200,
				y: game.world.centerY + game.world.randomY % 200,
				angle: game.rnd.angle(),
				spriteName: 'harvester',
				health: 200,
				shield: 100,
				shieldSprite: 'shield',
				harvestRange: 100,
				maxTank: 50,
				scale: 1,
				harvestRate: 400,
				strategy: function (args)
				{
					var spaceCraft = args.spaceCraft;

					spaceCraft.engine.moveForward();
					spaceCraft.engine.rotateLeft();
				}
			});
		}
	};

	return that;
};
