/**
 * Created by Ivan on 07.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.connection', []);

app.factory('connection', ['$http', function ($http)
{
	var saveStatisticLesson = function (args)
	{
		$http({
			url: '/statistic/lessons',
			method: 'POST',
			data: args
		});
	};

	var saveCode = function (data)
	{
		$http({
			method: 'POST',
			url: '/statistic/code',
			data:
			{
				code: data
			}
		});
	};

	return{
		saveStatisticLesson: saveStatisticLesson,
		saveCode: saveCode
	};
}]);
