'use strict';

/**
 * @since 02.12.15
 * @author Skurishin Vladislav
 */
var LessonPreloadState0 = function (spec)
{
	var that = {};

	var game = spec.game;

	that.preload = function ()
	{
		game.load.image('starField', 'images/sprites/starField.png');
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
