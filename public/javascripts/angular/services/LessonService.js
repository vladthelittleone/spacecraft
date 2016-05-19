/**
 * Created by Ivan on 14.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.lessonService', []);

app.factory('lessonService', ['$storage', 'connection', '$stateParams', 'audioManager', function ($storage, connection, $stateParams, audioManager)
{
	var audio;
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

	var tryShowHint = function  (char, callback)
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

	var previous = function ($scope, current)
	{
		$scope.audioPause = false;
		audioIndex = Math.max(audioIndex- 2, 0);
		nextAudio(audioPause, current);
	};

	var nextAudio = function ($scope, current)
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

	var toggleAudioPause = function ($scope)
	{
		if ($scope.audioPause && audio)
		{
			audio.play();
		}
		else
		{
			audio && audio.pause();
		}

		$scope.audioPause = !$scope.audioPause;
	};

	var previousAudio = function ($scope, current)
	{
		if (audio && audio.currentTime / 5 < 1)
		{
			audio.pause();
			audio.currentTime = 0;
			previous($scope, current);
		}
		else if (audio)
		{
			audio.currentTime = 0;
		}
	};

	var codeRun = function ($scope, options, current)
	{
		if (!$scope.isGameLesson)
		{
			options.isCodeRunning = true;

			if (current.result)
			{
				options.result = interpreter.execute(options.code);

				var result = current.result(options.result);

				$scope.botCss = result.css;

				if (result.status)
				{
					success(result.message);
				}
				else
				{
					error(result.message);
				}
			}

			options.isCodeRunning = false;
		}
		else
		{
			options.isCodeRunning = !options.isCodeRunning;

			options.update = function (s, w, t)
			{
				var result = current.handleUpdate(s, w, t);

				if (result && result.status)
				{
					success(result.message);
				}
			}
		}
	};

	return{
		setLesson: setLesson,
		getCurrentLesson: getCurrentLesson,
		getLessons: getLessons,
		tryShowHint: tryShowHint,
		previous: previous,
		nextAudio: nextAudio,
		toggleAudioPause: toggleAudioPause,
		previousAudio: previousAudio,
		codeRun: codeRun
	}

}]);
