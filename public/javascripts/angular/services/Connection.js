/**
 * Created by Ivan on 07.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.connection', []);

app.factory('connection', ['$http', function ($http)
{
	var resources =
	{
		code: 'javascripts/code/game.js',
		lessonCode: 'javascripts/code/lesson'
	};

	var links =
	{
		lessonsStatistic: '/statistic/lessons',
		code: '/statistic/code'
	};

	var httpSaveStatisticLesson = function (args)
	{
		$http({
			url: links.lessonsStatistic,
			method: 'POST',
			data: args
		});
	};

	var httpSaveCode = function (data)
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

	var httpGetCodeFromDB = function (callback)
	{
		$http({
			method: 'GET',
			url: links.code
		}).then(function(result)
		{
			callback(result);
		});
	};

	var httpGetCodeFromJs = function (callback)
	{
		$http({
			method: 'GET',
			url: resources.code
		}).success(function (date)
		{
			callback(date);
		});
	};

	var httpGetLessonFromDb = function (callback)
	{
		$http.get(links.lessonsStatistic).then(function(result)
		{
			callback(result);
		});
	};

	var getCodeLessonFromJs = function (i, id, callback)
	{
		$http({
			method: 'GET',
			url: resources.lessonCode + id + '/' + i + '.js'
		}).success(function (date)
			{
				callback(date);
			});
	};

	return {
		httpSaveStatisticLesson: httpSaveStatisticLesson,
		httpSaveCode: httpSaveCode,
		httpGetCodeFromDB: httpGetCodeFromDB,
		httpGetCodeFromJs: httpGetCodeFromJs,
		httpGetLessonFromDb: httpGetLessonFromDb,
		getCodeLessonFromJs: getCodeLessonFromJs
	};
}]);
