'use strict';

/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.bbotLessonBoard', []);

app.directive('bbotLessonBoard', function ()
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
			editorParams: '='
		},
		templateUrl: 'views/directives/bbot-lesson-board.html',
		link: link
	};
});
