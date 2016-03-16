'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var LessonPlayState0 = function (spec)
{
	var that = PlayState(spec);

	var game = spec.game;
	var scope = game.sc.scope;
	var sc = game.sc;

	var followFor = that.followFor;
	var gameInit = that.gameInit;

	//===================================
	//============== CYCLE ==============
	//===================================

	that.create = function ()
	{
		gameInit(sc.world.getBounds());
		that.entitiesInit();
	};

	that.update = function ()
	{
		if (!game.paused)
		{
			sc.world.update();
			runUserScript();
		}
	};

	that.entitiesInit = function ()
	{
		scope.$apply(function createAcademy()
		{

		});

	};

	return that;
};
