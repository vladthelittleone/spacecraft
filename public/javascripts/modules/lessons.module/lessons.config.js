'use strict';

LessonsConfig.$inject = ['$stateProvider'];

var resolves = require('./../../utils/helpers/resolves/lessons').values;

module.exports = LessonsConfig;

/**
 * Инициализация состояния окна выбора уроков.
 */
function LessonsConfig($stateProvider) {

	$stateProvider.state('lessons', {
		url:         '/lessons',
		templateUrl: 'views/lessons/lessons.html',
		controller:  'LessonsController as ctrl',
		resolve:     resolves
	});

}
