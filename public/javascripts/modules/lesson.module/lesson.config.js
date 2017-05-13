'use strict';

LessonConfig.$inject = ['$stateProvider'];

var resolves = require('./../../utils/helpers/resolves/lesson').values;

module.exports = LessonConfig;

/**
 * Инициализация состояния урока.
 */
function LessonConfig($stateProvider) {

	$stateProvider.state('lesson', {
		url:         '/lesson/:id',
		templateUrl: 'views/lessons/lesson.html',
		controller:  'LessonController as ctrl',
		resolve:     resolves
	});

}
