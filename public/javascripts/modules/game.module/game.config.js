'use strict';

LessonConfig.$inject = ['$stateProvider'];

var resolves = require('./game.resolve').values;

module.exports = LessonConfig;

/**
 * Инициализация состояния урока.
 */
function LessonConfig($stateProvider) {

	$stateProvider.state('game', {
		url:         '/game',
		templateUrl: 'views/game/main.html',
		controller:  'GameController as ctrl',
		resolve:     resolves
	});

}
