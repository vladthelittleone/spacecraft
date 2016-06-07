/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.login');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/main/login.html',
		controller: 'LoginController as ctrl'
	});
}]);
