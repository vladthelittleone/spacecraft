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
		game.load.image('harvester', 'images/sprites/spaceCraft/harvester.png');
		game.load.image('starField', 'images/sprites/starField.png');
		game.load.image('userShield', 'images/sprites/shield2.png');
		game.load.image('userShield', 'images/sprites/shield2.png');
		game.load.image('meteor1', 'images/sprites/meteor/meteor1.png');
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
