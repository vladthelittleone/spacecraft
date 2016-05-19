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

	var gameInit = that.gameInit;
	var tileUpdate = that.updateTileSprite;

	//===================================
	//============== CYCLE ==============
	//===================================

	that.create = function ()
	{
		gameInit(sc.world.getBounds());
		that.entitiesInit();
		game.camera.focusOnXY(base.sprite.x + (base.sprite.width / 4), base.sprite.y);
	};

	that.update = function ()
	{
		if (!game.paused)
		{
			base.update();
			sc.world.update();
		}

		tileUpdate();
	};

	that.entitiesInit = function ()
	{
		var factory = sc.world.factory;

		base = AcademyBase({
			game: game,
			x: game.world.centerX,
			y: game.world.centerY,
			spriteName: 'base'
		});

		for (var i = 0; i < 3; i++)
		{
			var i1 = utils.randomInt(-200, 200);
			var i2 = utils.randomInt(-200, 200);

			factory.createHarvester({
				x: base.sprite.x + i1,
				y: base.sprite.y + i2,
				angle: game.rnd.angle(),
				harvestRange: 100,
				maxTank: 50,
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
