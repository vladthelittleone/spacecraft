'use strict';

/**
 * Зависимости.
 */
var Phaser = require('phaser');

// Экспорт
module.exports = Game;

/**
 * Модуль создания игры опредленного типа.
 *
 * Created by vladthelittleone on 21.10.15.
 */
var Game = function (spec)
{
	var that = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

	initParams();
	initStates();

	return that;

	/**
	 * Инициализация основных игровых параметров.
	 */
	function initParams ()
	{
		that.sc = {};
		that.sc.scope = spec.scope;
		that.sc.callers = spec.callers;
		that.sc.world = {};
		that.sc.collisionGroups = {};
		that.sc.collisionGroups.spaceCraft = {};
		that.sc.collisionGroups.bonus = {};
	}

	/**
	 * Инициализация состояний.
	 */
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
};
