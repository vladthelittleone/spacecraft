'use strict';

/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.bbotBoard', []);

app.directive('bbotBoard', ['$sce', function ($sce)
{
	var link = function ($scope)
	{
		$scope.closeBBotList = function()
		{
			$scope.textBot = false;
		};

		$scope.getText = function ()
		{
			if ($scope.textBot)
			{
				return $sce.trustAsHtml($scope.textBot);
			}
		};
	};

	return {
		scope: {
			quote: '=',
			lesson: '=',
			textBot: '=',
			next: '=',
			css: '='
		},
		templateUrl: 'views/directives/bbot-board.html',
		link: link
	};
}]);
