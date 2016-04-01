'use strict';
/**
 * Created by Ivan on 23.03.2016.
 */
var app = angular.module('spacecraft.stars', []);

app.directive('stars', ['$http', '$state', function($http, $state)
{
	function link ($scope)
	{
		$scope.radioChange = function (value)
		{
			$http({
				url: '/statistic/lessons/stars',
				method: 'POST',
				data: {
					idLesson: $scope.idLesson,
					stars: value
				}
			});
			$state.go('lessons');
		};
	}

	return {
		scope: {
			idLesson: '='
		},
		templateUrl: 'views/directives/stars.html',
		link: link
	};
}]);
