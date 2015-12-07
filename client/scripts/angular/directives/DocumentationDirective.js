/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.documentation', []);

app.directive('documentation', function ()
{
	var link = function ($scope)
	{
		//===================================
		//============== FUNCTION ===========
		//===================================

		$scope.functionTutorial = {};
		$scope.functionTutorialOpen = false;

		$scope.openFunctionTutorial = function (v)
		{
			$scope.functionTutorial = tutorial[v];
			$scope.functionTutorialOpen = true;
		};
	};

	return {
		scope: {},
		templateUrl: 'views/documentation.html',
		link: link
	};
});
