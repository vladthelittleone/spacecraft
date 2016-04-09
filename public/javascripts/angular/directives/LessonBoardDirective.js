/**
 * Created by vladthelittleone on 23.12.15.
 */
var app = angular.module('spacecraft.lessonBoard', []);

app.directive('lessonBoard', ['$sce', function ($sce)
{
	var link = function ($scope)
	{
		$scope.getContent = function ()
		{
			return $sce.trustAsHtml($scope.lesson.content());
		};

		$scope.getHint = function ()
		{
			if ($scope.lesson.hint)
			{
				return $sce.trustAsHtml($scope.lesson.hint);
			}
		};

		$scope.getInstructions = function ()
		{
			return $sce.trustAsHtml($scope.lesson.instructions);
		};

		$scope.showHint = function ()
		{
			$scope.hint = !$scope.hint;
		};
	};

	return {
		scope:
		{
			lesson: '=',
			textContent: '='
		},
		templateUrl: 'views/directives/lesson-board.html',
		link: link
	};
}]);
