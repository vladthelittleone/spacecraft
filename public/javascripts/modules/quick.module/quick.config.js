'use strict';

QuickConfig.$inject = ['$stateProvider'];

module.exports = QuickConfig;

/**
 * Инициализация состояния подсказки пользователю.
 */
function QuickConfig($stateProvider) {

	$stateProvider.state('quick', {
		url: '/quick',
		templateUrl: 'views/quick/quick.html',
		controller: 'QuickController as ctrl'
	});

}
