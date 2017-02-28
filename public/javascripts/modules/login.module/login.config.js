'use strict';

LoginConfig.$inject = ['$stateProvider'];

module.exports = LoginConfig;

/**
 * Инициализация состояния авторизации.
 */
function LoginConfig($stateProvider) {

	$stateProvider.state('sigIn', {
		url: '/sigIn',
		templateUrl: 'views/main/sigIn.html',
		controller: 'LoginController as ctrl'
	});

}
