'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState1 = function (spec)
{
	var that = RunScriptPlayState(spec);

	var game = that.game;
	var scope = that.scope;
	var sc = that.sc;

	var bBotText;

	//===================================
	//============== CYCLE ==============
	//===================================

	var superCreate = that.create;

	that.create = function ()
	{
		superCreate(function (userCode)
		{
			var Class = new Function('BBotDebug', userCode);

			return new Class(function BBotDebug (text)
			{
				bBotText = text;
			});
		});
	};

	that.update = function ()
	{
		var s = ApiLesson1(scope.spaceCraft);
		var w = WorldApi(sc.world, scope.spaceCraft.getId());

		that.tryRunScript(s, w);

		scope.$apply(function ()
		{
			var upd = scope.editorOptions.update;

			upd && upd(scope.spaceCraft, sc.world, bBotText);

			if (scope.editorOptions.nextSubLesson)
			{
				game.state.start('boot');
				scope.editorOptions.nextSubLesson = false;
			}
		});
	};

	that.entitiesInit = function ()
	{
		var factory = sc.world.factory;

		scope.$apply(function createSpaceCraft()
		{
			scope.spaceCraft = factory.createTransport({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteShield: 'userShield',
				spriteName: 'fighter'
			});
		});
	};

	return that;
};

