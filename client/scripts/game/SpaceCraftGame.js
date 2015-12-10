'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var SpaceCraftGame = function (spec)
{
	function initParams()
	{
		that.sc.scope = spec.scope;
		that.sc.callers = spec.callers;
		that.sc.world = {};
		that.sc.collisionGroups = {};
		that.sc.collisionGroups.spaceCraft = {};
		that.sc.collisionGroups.bonus = {};
		that.sc.seq = utils.seq();
	}

	function initStates()
	{
		that.state.add('boot', BootState({game: that}));
		that.state.add('preload', PreloadState({game: that}));
		that.state.add('menu', MenuState({game: that}));
		that.state.add('play', PlayState({game: that}));

		that.state.start('boot');
	}

	var that = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

	that.sc = {};

	initParams();
	initStates();

	return that;
};
