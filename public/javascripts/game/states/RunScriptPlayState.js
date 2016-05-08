'use strict';

/**
 * @since 08.05.16
 * @author Skurishin Vladislav
 */
var RunScriptPlayState = function (spec)
{
	var that = PlayState(spec);

	var followFor = that.followFor;
	var gameInit = that.gameInit;
	var keysControl = that.keysControl;

	var isRunning;
	var userCode;
	var userObject;

	that.game = spec.game;
	that.scope = that.game.sc.scope;
	that.sc = that.game.sc;

	that.runUserScript = function (args)
	{
		if (isRunning)
		{
			try
			{
				userObject.run && userObject.run.apply(null, args);
				that.scope.editorOptions.error = false;
			}
			catch (err)
			{
				that.scope.editorOptions.error = err;
				that.scope.editorOptions.isCodeRunning = false;
			}
		}
	};

	that.create = function(createUserObjectCallback)
	{
		gameInit(that.sc.world.getBounds(), true);
		that.entitiesInit();
		followFor(that.scope.spaceCraft.sprite);

		that.scope.$watch('editorOptions.code', function (n)
		{
			userCode = n;
		});

		that.scope.$watch('editorOptions.isCodeRunning', function (n)
		{
			isRunning = n;

			if (that.game)
			{
				that.game.paused = !isRunning;
			}

			if (n)
			{
				try
				{
					userObject = createUserObjectCallback(userCode);
				}
				catch (err)
				{
					that.scope.editorOptions.error = err;
					that.scope.editorOptions.isCodeRunning = false;
				}
			}
		});
	};

	that.tryRunScript = function ()
	{
		if (!that.game.paused)
		{
			that.sc.world.update();
			that.runUserScript(Array.prototype.slice.call(arguments));
		}

		keysControl();
	};

	return that;
};
