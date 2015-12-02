'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var SpaceCraftGame = function (spec)
{
	var that = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

	that.sc = {};

	that.sc.scope = spec.scope;
	that.sc.world = {};
	that.sc.collisionGroups = {};
	that.sc.collisionGroups.spaceCraft = {};
	that.sc.collisionGroups.bonus = {};
	that.sc.seq = utils.seq();

	that.state.add('boot', BootState({game: that}));
	that.state.add('preload', PreloadState({game: that}));
	that.state.add('menu', MenuState({game: that}));
	that.state.add('play', PlayState({game: that}));

	that.state.start('boot');

	return that;
};

Array.prototype.removeElement = function (element)
{
    var index = this.indexOf(element);
    this.removeElementByIndex(index)
};

Array.prototype.removeElementByIndex = function (index)
{
    if (index > -1)
    {
        this.splice(index, 1);
    }
};
