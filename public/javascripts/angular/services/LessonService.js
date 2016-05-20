/**
 * Created by Ivan on 14.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.lessonService', []);

app.factory('lessonService', ['$storage', 'connection', '$stateParams', 'audioManager', 'interpreter',
	function ($storage, connection, $stateParams, audioManager, interpreter)
{
	var options = {
		isCodeRunning: false,
		code: '',
		error: null
	};

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

	function current($scope)
	{
		return $scope.lesson.sub[$scope.subIndex];
	}

	function error($scope, message)
	{
		$scope.textBot = message;

		// Удаляем кнопку 'Далее' тк получили ошибку.
		$scope.nextSubLesson = null;
	}

	function success($scope, message, editorSession)
	{

		$scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		$scope.nextSubLesson = nextSubLesson($scope, editorSession);
	}

	var getOptions = function ()
	{
		return options;
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

	var previous = function ($scope)
	{
		$scope.audioPause = false;
		audioIndex = Math.max(audioIndex- 2, 0);
		nextAudio($scope);
	};

	var nextAudio = function ($scope)
	{
		var ch = $scope.char = current($scope).character[audioIndex];

		if (ch)
		{
			audio = audioManager.create(ch.audio);
			audio.play();
			$scope.audioPause = false;

			tryShowHint(audio, ch, function ()
			{
				$scope.audioPause = true;
				audioIndex++;
				nextAudio($scope);
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

	var previousAudio = function ($scope)
	{
		if (audio && audio.currentTime / 5 < 1)
		{
			audio.pause();
			audio.currentTime = 0;
			previous($scope);
		}
		else if (audio)
		{
			audio.currentTime = 0;
		}
	};

	var codeRun = function ($scope, editorSession)
	{
		if (!$scope.isGameLesson)
		{
			options.isCodeRunning = true;

			if (current($scope) && current($scope).result)
			{
				options.result = interpreter.execute(options.code);

				var result = current($scope).result(options.result);

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

	function nextSubLesson($scope, editorSession)
	{
		options.nextSubLesson = true;
		options.isCodeRunning = false;

		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		// Текущий объект статистики уроков
		var l = getLessons();

		if (i !== len)
		{
			options.code = initCode($scope, ++$scope.subIndex, editorSession);

			// Устанавливаем текущий урок в хранилище
			setLesson(l, $scope.subIndex, len);

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: $scope.subIndex
			});

			nextAudio($scope, current());
		}
		else
		{
			// Устанавливаем текущий урок в хранилище
			setLesson(l, 0, len, true);

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: 0,
				completed: true
			});

			$scope.starsHide = true;
		}

		audioIndex = 0;
		$scope.textContent = false;
	}

	var initCode = function ($scope, i, editorSession)
	{
		connection.getCodeLessonFromJs(i, $stateParams.id, function (date)
		{
			editorSession.setValue(date);
			options.code = date;

			// Слова BBot'а
			$scope.textBot = current($scope).defaultBBot && current($scope).defaultBBot();
			$scope.isGameLesson = $scope.lesson.isGameLesson;
			$scope.nextSubLesson = nextSubLesson($scope, editorSession);

			nextAudio($scope);
		});
	};

	var initialize = function ($scope, id, editorSession)
	{
		// Получаем урок из локального хранилища
		var ls = st.getCurrent(id);
		$scope.subIndex = 0;

		if(!ls)
		{
			// Идем в базу за статой по урокам
			connection.httpGetLessonFromDb(function(result)
			{
				if(result.data[id])
				{
					// Индекс под урока
					$scope.subIndex = parseInt(result.data[id].current);
				}

				initCode($scope, $scope.subIndex, editorSession);
			});
		}
		else
		{
			$scope.subIndex = ls;
			initCode($scope, ls, editorSession);
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
		codeRun: codeRun,
		getOptions: getOptions,
		current: current,
		nextSubLesson: nextSubLesson,
		initCode: initCode,
		initialize: initialize
	}

}]);
