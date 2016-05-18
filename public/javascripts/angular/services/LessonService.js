/**
 * Created by Ivan on 14.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.lessonService', []);

app.factory('lessonService', ['$storage', 'connection', '$stateParams', 'audioManager', function ($storage, connection, $stateParams, audioManager)
{
	var audioIndex = 0;
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

	var getLessons = function ()
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

		st.set('lessons', a);
	};

	var getCurrentLesson = function (name)
	{
		return st.getCurrent(name);
	};

	var tryShowHint = function  (audio,char, callback)
	{
		var hint = char.hint;

		if (hint)
		{
			var enjoyHint = new EnjoyHint(
				{
					onEnd: function ()
					{
						enjoyHint = null;
						if (char.waitForHint)
						{
							audio.onended = callback;
						}
					}
				});

			enjoyHint.set(hint);
			enjoyHint.run();

			if (!char.waitForHint)
			{
				audio.onended = function ()
				{
					enjoyHint && enjoyHint.trigger("skip");
					callback && callback();
				}
			}
		}
		else
		{
			audio.onended = callback;
		}
	};

	var previousAudio = function ($scope, audio, current)
	{
		$scope.audioPause = false;
		audioIndex = Math.max(audioIndex- 2, 0);
		nextAudio(audioPause, audio, current);
	};

	var nextAudio = function ($scope, audio, current)
	{
		var ch = $scope.char = current.character[audioIndex];

		if (ch)
		{
			audio = audioManager.create(ch.audio);
			audio.play();
			$scope.audioPause = false;

			tryShowHint(audio, ch, function ()
			{
				$scope.audioPause = true;
				audioIndex++;
				next();
				$scope.$apply();
			});
		}
	};

	return{
		setLesson: setLesson,
		getCurrentLesson: getCurrentLesson,
		getLessons: getLessons,
		tryShowHint: tryShowHint,
		previousAudio: previousAudio,
		nextAudio: nextAudio
	}

}]);
