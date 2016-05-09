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

	var getCodeFromDB = function (callback)
	{
		$http({
			method: 'GET',
			url: '/statistic/code'
		}).then(function(result)
		{
			callback(result);
		});
	};

	var getCodeFromJs = function (callback)
	{
		$http({
			method: 'GET',
			url: 'javascripts/code/game.js'
		}).success(function (date)
		{
			callback(date);
		});
	};

	return{
		saveStatisticLesson: saveStatisticLesson,
		saveCode: saveCode,
		getCodeFromDB: getCodeFromDB,
		getCodeFromJs: getCodeFromJs
	};
}]);
