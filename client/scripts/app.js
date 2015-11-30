'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
angular.module('spacecraft', [
    'ui.router',
    'ui.ace',
    'ui.layout',
    'spacecraft.main',
    'spacecraft.errorBoard',
    'spacecraft.gameCanvas',
    'spacecraft.leadBoard',
    'spacecraft.tipsAndTricks',
    'spacecraft.storage'
])
    .config(['$urlRouterProvider', function ($urlRouterProvider)
    {
        // For any unmatched url, send to ""
        $urlRouterProvider.otherwise("/");
    }]);
