'use strict';

/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.bbotBoard', []);

app.directive('bbotBoard', function ()
{
	var link = function ($scope)
	{
		$scope.closeBBotList = function()
		{
			$scope.editorParams.error = false;
		};
	};

	return {
		scope: {
			editorParams: '=',
			quote: '=',
			lesson: '='
		},
		templateUrl: 'views/directives/bbot-board.html',
		link: link
	};
});
