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

		game.load.audio('laser1', ['audio/laser1.wav']);
		game.load.audio('explosion1', ['audio/explosion1.wav']);
		game.load.audio('explosion2', ['audio/explosion2.wav']);
		game.load.audio('shield1', ['audio/shieldvisible1.wav']);
		game.load.audio('bonus1', ['audio/bonus1.wav']);
		game.load.audio('harvest1', ['audio/harvest1.wav']);
	};

	that.create = function ()
	{
		game.state.start('menu');
	};

	return that;
};
