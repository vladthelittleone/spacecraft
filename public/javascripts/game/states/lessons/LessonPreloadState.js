'use strict';

/**
 * @since 02.12.15
 * @author Skurishin Vladislav
 */
var LessonPreloadState = function (spec)
{
	var that = {};

	var game = spec.game;

	that.preload = function ()
	{
		Object.keys(spec.loads).forEach(function(key) {
			game.load.image(key, spec.loads[key]);
		}, spec.loads);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
