'use strict';

GameConfig.$inject = ['$stateProvider'];

module.exports = GameConfig;

/**
 * Инициализация состояния игры.
 */
function GameConfig($stateProvider) {

	$stateProvider.state('game', {
		url:         '/game',
		templateUrl: 'views/game/game.html',
		controller:  'GameController as ctrl'
	});

}
