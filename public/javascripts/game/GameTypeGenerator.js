'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */
var GameTypeGenerator = function (spec)
{
	var that = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

	function initParams ()
	{
		that.sc = {};
		that.sc.scope = spec.scope;
		that.sc.callers = spec.callers;
		that.sc.world = {};
		that.sc.collisionGroups = {};
		that.sc.collisionGroups.spaceCraft = {};
		that.sc.collisionGroups.bonus = {};
		that.sc.seq = utils.seq();
	}

	function initStates ()
	{
		var isLesson = spec.lessonId;
		var playState = OnlinePlay({game: that});
		var preloadState = OnlinePreload({game: that});

		if (isLesson)
		{
			var id = parseInt(spec.lessonId);
			var lesson = lessonsArray[id]();

			playState = lesson.lessonPlayState.call(null, {game: that});
			preloadState = LessonPreloadState({game: that, loads: lesson.preload});
		}

		that.state.add('boot', BootState({game: that}));
		that.state.add('preload', preloadState);
		that.state.add('menu', MenuState({game: that}));
		that.state.add('play', playState);

		that.state.start('boot');
	}

	initParams();
	initStates();

	return that;
};
