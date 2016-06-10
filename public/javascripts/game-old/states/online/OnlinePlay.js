'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var OnlinePlay = function (spec)
{
	var t = RunScriptPlayState(spec);

	var game = t.game;
	var scope = t.scope;
	var sc = t.sc;

	//===================================
	//============== CYCLE ==============
	//===================================

	var superCreate = t.create;

	t.create = function ()
	{
		superCreate(function (userCode)
		{
			var Class = new Function(userCode);
			return new Class();
		});
	};

	t.update = function ()
	{
		var s = SpaceCraftApi(scope.spaceCraft);
		var w = WorldApi(sc.world, scope.spaceCraft.getId());

		t.tryRunScript(s, w);

		scope.$apply(function ()
		{
			if (!scope.spaceCraft.protection.isAlive())
			{
				game.paused = true;
				sc.callers.result(scope.spaceCraft.statistic);
			}
		});

		sc.animationManager.update();
	};

	t.entitiesInit = function ()
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
				spriteShield: 'userShield'
			});
		});

	};

	return t;
};
