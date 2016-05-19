'use strict';

/**
 * @since 08.05.16
 * @author Skurishin Vladislav
 */
var RunScriptPlayState = function (spec)
{
	var t = PlayState(spec);

	var followFor = t.followFor;
	var gameInit = t.gameInit;
	var keysControl = t.keysControl;

	var isRunning;
	var userCode;
	var userObject;

	t.game = spec.game;
	t.scope = t.game.sc.scope;
	t.sc = t.game.sc;

	t.runUserScript = function (args)
	{
		if (isRunning)
		{
			try
			{
				userObject.run && userObject.run.apply(null, args);
				t.scope.editorOptions.error = false;
			}
			catch (err)
			{
				t.scope.editorOptions.error = err;
				t.scope.editorOptions.isCodeRunning = false;
			}
		}
	};

	t.create = function(createUserObjectCallback)
	{
		gameInit(t.sc.world.getBounds(), true);
		t.entitiesInit();
		followFor(t.scope.spaceCraft.sprite);

		t.scope.$watch('editorOptions.code', function (v)
		{
			userCode = v;
		});

		t.scope.$watch('editorOptions.isCodeRunning', function (v)
		{
			function runUserCode()
			{
				if (v)
				{
					try
					{
						userObject = createUserObjectCallback(userCode);
					}
					catch (err)
					{
						t.scope.editorOptions.error = err;
						t.scope.editorOptions.isCodeRunning = false;
					}
				}
			}

			isRunning = v;

			if (t.scope.editorOptions.resetGame)
			{
				t.game.state.start('boot');
				t.scope.editorOptions.resetGame = false;
			}
			else
			{
				if (t.game)
				{
					t.game.paused = !isRunning;
				}

				runUserCode();
			}
		});
	};

	t.tryRunScript = function ()
	{
		t.updateTileSprite();

		if (!t.game.paused)
		{
			t.sc.world.update();
			t.runUserScript(Array.prototype.slice.call(arguments));
		}

		keysControl();
	};

	return t;
};
