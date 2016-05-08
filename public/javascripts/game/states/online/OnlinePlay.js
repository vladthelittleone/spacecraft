'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var OnlinePlay = function (spec)
{
	var that = RunScriptPlayState(spec);

	var game = that.game;
	var scope = that.scope;
	var sc = that.sc;

	//===================================
	//============== CYCLE ==============
	//===================================

	var superCreate = that.create;

	that.create = function ()
	{
		superCreate(function (userCode)
		{
			var Class = new Function(userCode);
			return new Class();
		});
	};

	that.update = function ()
	{
		var s = SpaceCraftApi(scope.spaceCraft);
		var w = WorldApi(sc.world, scope.spaceCraft.getId());

		that.tryRunScript(s, w);

		scope.$apply(function ()
		{
			if (!scope.spaceCraft.isAlive())
			{
				sc.callers.result(scope.spaceCraft.statistic);
				game.paused = true;
			}
		});

		sc.animationManager.update();
	};

	that.entitiesInit = function ()
	{
		var factory = sc.world.factory;

		// Создаем объект мира
		factory.createMeteors({count: 2});
		factory.createBots({
			count: 20,
			strategy: botStrategy,
			health: 200,
			shield: 100
		});

		scope.$apply(function createSpaceCraft()
		{
			scope.spaceCraft = factory.createSpaceCraft({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteName: 'spaceCraft',
				health: 200,
				shield: 100,
				shieldSprite: 'userShield'
			});
		});

	};

	return that;
};
