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
		lessonsCode: 'javascripts/code/lesson'
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

	var httpGetCodeFromDataBase = function (callback)
	{
		$http({
			method: 'GET',
			url: links.code
		}).then(function(result)
		{
			callback(result);
		});
	};

	var httpGetGameCodeFromJs = function (callback)
	{
		$http({
			method: 'GET',
			url: resources.code
		}).success(function (date)
		{
			callback(date);
		});
	};

	var httpGetCodeFromJs = function (source, callback)
	{
		$http({
			method: 'GET',
			url: source
		}).success(function (data)
		{
			callback(data);
		});
	};

	var httpGetLessonCodeFromJs = function (lessonId, subLessonId, callback)
	{
		var source = resources.lessonsCode + lessonId + '/' + subLessonId + '.js';
		httpGetCodeFromJs(source, callback)
	};

	var httpGetLessonsStatisticsFromDataBase = function (callback)
	{
		$http.get(links.lessonsStatistic).then(callback);
	};

	return {
		httpSaveStatisticLesson: httpSaveStatisticLesson,
		httpSaveCode: httpSaveCode,
		httpGetCodeFromDataBase: httpGetCodeFromDataBase,
		httpGetGameCodeFromJs: httpGetGameCodeFromJs,
		httpGetCodeFromJs: httpGetCodeFromJs,
		httpGetLessonCodeFromJs: httpGetLessonCodeFromJs,
		httpGetLessonsStatisticsFromDataBase: httpGetLessonsStatisticsFromDataBase
	};
}]);
