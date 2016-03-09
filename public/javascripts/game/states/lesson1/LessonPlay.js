'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState = function (spec)
{
	var that = PlayState(spec);

	var game = spec.game;
	var scope = game.sc.scope;
	var sc = game.sc;

	var isRunning;
	var userCode;
	var userObject;

	var followFor = that.followFor;
	var gameInit = that.gameInit;
	var keysControl = that.keysControl;

	//===================================
	//============== HELP ===============
	//===================================

	function runUserScript()
	{
		if (isRunning)
		{
			try
			{
				var s = HarvesterApi(scope.spaceCraft);
				var w = WorldApi(sc.world, scope.spaceCraft.getId());

				userObject.run && userObject.run(s, w);
				scope.editorOptions.error = false;
			}
			catch (err)
			{
				scope.editorOptions.error = err;
				scope.editorOptions.isCodeRunning = false;
			}
		}
	}

	//===================================
	//============== CYCLE ==============
	//===================================

	that.create = function ()
	{
		gameInit(sc.world.getBounds());
		that.entitiesInit();
		followFor(scope.spaceCraft.sprite);


		scope.$watch('editorOptions.code', function (n)
		{
			userCode = n;
		});

		scope.$watch('editorOptions.isCodeRunning', function (n)
		{
			isRunning = n;

			if (game)
			{
				game.paused = !isRunning;
			}

			if (n)
			{
				try
				{
					var Class = new Function(userCode);
					userObject = new Class();
				}
				catch (err)
				{
					scope.editorOptions.error = err;
					scope.editorOptions.isCodeRunning = false;
				}
			}
		});
	};

	that.update = function ()
	{
		scope.$apply(function ()
		{
			var upd = scope.editorOptions.update;

			upd && upd(scope.spaceCraft, sc.world);

			if (scope.editorOptions.nextSubLesson)
			{
				game.state.start('boot');
				scope.editorOptions.nextSubLesson = false;
			}
		});

		if (!game.paused)
		{
			sc.world.update();
			runUserScript();
		}

		keysControl();
	};

	that.entitiesInit = function ()
	{
		scope.$apply(function createHarvester()
		{
			var factory = sc.world.factory;

			factory.createMeteor({
				x: 500,
				y: 500,
				scale: 1.0,
				spriteName: 'meteor1'
			});

			scope.spaceCraft = factory.createHarvester({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteName: 'harvester',
				health: 200,
				shield: 100,
				shieldSprite: 'userShield'
			});
		});

	};

	return that;
};
