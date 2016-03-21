'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
var app = angular.module('spacecraft', [
	'chart.js',
	'ui.router',
	'ui.ace',
	'ui.layout',
	'spacecraft.storage',
	'spacecraft.autocompleter',
	'spacecraft.authentication',
	'spacecraft.statistics',
	'spacecraft.audioManager',
	'spacecraft.lessonProvider',
	'spacecraft.interpreter',
	'spacecraft.bbotBoard',
	'spacecraft.gameCanvas',
	'spacecraft.documentation',
	'spacecraft.game',
	'spacecraft.result',
	'spacecraft.welcome',
	'spacecraft.lessons',
	'spacecraft.login',
	'spacecraft.lessonBoard',
	'spacecraft.lesson',
	'spacecraft.quick',
	'spacecraft.repeatFinished'
]);

app.config(['$locationProvider', '$urlRouterProvider', 'ChartJsProvider',
	function ($locationProvider, $urlRouterProvider, ChartJsProvider)
{
	// For any unmatched url, send to ''
	$urlRouterProvider.otherwise('/');

	// Configure all charts
	ChartJsProvider.setOptions({
		colours: ['#152B39', '#C5C8C6'],
		responsive: true
	});

	// Configure all line charts
	ChartJsProvider.setOptions('Line', {
		datasetFill: false
	});
}]);

app.run(['authentication', '$rootScope', '$state', '$stateParams',
	function (authentication, $rootScope, $state, $stateParams)
{
	$rootScope.$on('$stateChangeSuccess', function ()
	{
		var id = parseInt($stateParams.id);
		var current = $state.current.name;
		var isFirstLesson = (current === 'lesson') && !id;

		if (current !== 'login' && !isFirstLesson)
		{
			authentication.isLoggedIn(
			{
				error: function ()
				{
					$state.go('login');
				}
			});
		}
	});
}]);
