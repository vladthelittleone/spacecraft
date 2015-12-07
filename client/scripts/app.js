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
	'ui.router',
	'ui.ace',
	'ui.layout',
	'spacecraft.storage',
	'spacecraft.autocompleter',
	'spacecraft.statistics',
	'spacecraft.errorBoard',
	'spacecraft.gameCanvas',
	'spacecraft.documentation',
	'spacecraft.tips',
	'spacecraft.game',
	'spacecraft.result'
]);

app.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider)
{
	$locationProvider.html5Mode(true);

	// For any unmatched url, send to ''
	$urlRouterProvider.otherwise('/');
}]);
