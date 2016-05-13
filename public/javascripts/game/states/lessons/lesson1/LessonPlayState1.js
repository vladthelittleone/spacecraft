'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState1 = function (spec)
{
	var t = RunScriptPlayState(spec);

	var game = t.game;
	var scope = t.scope;
	var sc = t.sc;

	var bBotText;

	//===================================
	//============== CYCLE ==============
	//===================================

	var superCreate = t.create;

	t.create = function ()
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

	t.update = function ()
	{
		var s = ApiLesson1(scope.spaceCraft);
		var w = WorldApi(sc.world, scope.spaceCraft.getId());

		t.tryRunScript(s, w);

		scope.$apply(function ()
		{
			var upd = scope.editorOptions.update;

			upd && upd({
				spaceCraft: scope.spaceCraft,
				world: sc.world,
				text: bBotText
			});

			if (scope.editorOptions.nextSubLesson)
			{
				game.state.start('boot');
				scope.editorOptions.nextSubLesson = false;
			}

		});
	};

	t.entitiesInit = function ()
	{
		var factory = sc.world.factory;

		scope.$apply(function createSpaceCraft()
		{
			scope.spaceCraft = factory.createTransport({
				x: game.world.centerX,
				y: game.world.centerY,
				spriteShield: 'userShield',
				spriteName: 'transport'
			});
		});

		var R = Phaser.Point.distance(scope.spaceCraft.sprite, new Phaser.Point(0, 0));
		var bounds = sc.world.getBounds();

		factory.createMeteorField({
			shift: 10,
			count: bounds.height,
			radius: R,
			start: bounds.y
		});
	};

	return t;
};

