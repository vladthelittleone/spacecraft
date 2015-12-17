/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.learn');

app.config(['$stateProvider', function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider.state('learn', {
		url: '/learn',
		templateUrl: 'views/main/learn.html',
		controller: 'LearnController as ctrl'
	});
}]);
