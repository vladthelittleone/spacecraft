'use strict';

CombatConfig.$inject = ['$stateProvider'];

var resolves = require('./combat.resolve').values;

module.exports = CombatConfig;

/**
 * Инициализация состояния урока.
 */
function CombatConfig($stateProvider) {

	$stateProvider.state('combat', {
		url:         '/combat',
		templateUrl: 'views/combat/main.html',
		controller:  'CombatController as ctrl',
		resolve:     resolves
	});

}
