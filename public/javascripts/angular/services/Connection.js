/**
 * Created by Ivan on 07.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.connection', []);

app.factory('connection', ['$http', function ($http)
{
	var resources = {
		code: 'javascripts/code/game.js'
	};

	var links = {
		lessonsStatistic: '/statistic/lessons',
		code: '/statistic/code'
	};

	var saveStatisticLesson = function (args)
	{
		$http({
			url: links.lessonsStatistic,
			method: 'POST',
			data: args
		});
	};

	var saveCode = function (data)
	{
		$http({
			method: 'POST',
			url: links.code,
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
			url: links.code
		}).then(function(result)
		{
			callback(result);
		});
	};

	var getCodeFromJs = function (callback)
	{
		$http({
			method: 'GET',
			url: resources.code
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
