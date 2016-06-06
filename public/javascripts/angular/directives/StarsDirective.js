'use strict';

/**
 * Created by Ivan on 23.03.2016.
 */
var app = angular.module('spacecraft.stars', []);

app.directive('stars', ['connection', '$state', function(connection, $state)
{
	function link ($scope)
	{
		$scope.radioChange = function (value)
		{
			connection.httpLessonRate($scope.idLesson, value);
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
