/**
 * Created by Ivan on 14.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.lessonService', []);

app.factory('lessonService', ['$storage', 'connection', function ($storage, connection)
{
	/**
	 * Local storage
	 */
	var st =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, JSON.stringify(value));
		},
		getCurrent: function(name)
		{
			var l = JSON.parse($storage.local.getItem('lessons'));

			if (l && l[name])
			{
				return parseInt(l[name].current) - 1;
			}

			return 0;
		},
		getLessons: function ()
		{
			return JSON.parse($storage.local.getItem('lessons')) || [];
		}
	};

	var getCurrentLessonLS = function (name)
	{
		return st.getCurrent(name);
	};

	var getLessonsLS = function ()
	{
		return st.getLessons();
	};

	var setLesson = function (a, i, len, completed)
	{
		// Устанавливаем текущий
		a[$stateParams.id] = {
			current: i + 1,
			size: len + 1,
			completed: completed
		};

		lessonService.st.set('lessons', a);
	};

	return{
		setLesson: setLesson,
		getCurrentLessonLS: getCurrentLessonLS,
		getLessonsLS: getLessonsLS
	}

}]);
