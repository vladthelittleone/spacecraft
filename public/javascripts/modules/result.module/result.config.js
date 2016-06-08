'use strict';

ResultConfig.$inject = ['$stateProvider'];

module.exports = ResultConfig;

/**
 * Инициализация состояния результатов пользователя.
 */
function ResultConfig($stateProvider) {

	$stateProvider.state('result', {
		url: '/result',
		templateUrl: 'views/main/result.html',
		controller: 'ResultController as ctrl'
	});

}
