/**
 * @ngdoc function
 * @name spacecraft.controller:MainController
 * @description
 * # MainController
 * Controller of the spacecraft
 * http://benclinkinbeard.com/talks/2014/ng-conf/#/19
 * https://blog.codecentric.de/en/2014/08/angularjs-browserify/
 */
angular.module('spacecraft.main', [])
	.config(['$stateProvider', require('./config')])
	.controller('MainController', ['$scope', '$storage', require('./controller.js')]);
