/**
 * Created by vladthelittleone on 16.03.16.
 */
var LessonGameInit = function (spec)
{
	var that = SpaceCraftGame(spec);

	that.initParams = function ()
	{
		that.sc.scope = spec.scope;
		that.sc.callers = spec.callers;
		that.sc.world = {};
		that.sc.collisionGroups = {};
		that.sc.collisionGroups.spaceCraft = {};
		that.sc.collisionGroups.bonus = {};
		that.sc.seq = utils.seq();
	};

	that.initStates = function ()
	{
		that.state.add('boot', BootState({game: that}));
		that.state.add('preload', LessonPreloadState({game: that, loads: spec.loads}));
		that.state.add('menu', MenuState({game: that}));
		that.state.add('play', spec.playState.call(null, {game: that}));

		that.state.start('boot');
	};

	return that;
};
