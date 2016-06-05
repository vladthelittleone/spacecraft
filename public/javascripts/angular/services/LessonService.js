'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonService', []);

app.service('lessonService', ['$storage', 'connection', 'audioManager', 'interpreter', 'markerService',
	function ($storage, connection, audioManager, interpreter, markerService)
{
	var editorSession;
	var markerId;
	var lessonId;
	var scope;
	var audioIndex;
	var options = {};

	var audioWrapper = function ()
	{
		var audio;

		var that = {};

		function previous()
		{
			audioIndex = Math.max(audioIndex- 2, 0);
			next();
		}

		that.previousAudio = function ()
		{
			if (audio.currentTime / 5 < 1)
			{
				audio.pause();
				audio.currentTime = 0;
				previous();

				return true;
			}
			else
			{
				audio.currentTime = 0;
			}
		};

		that.toggleAudio = function (audioPause)
		{
			if (audioPause)
			{
				audio.play();
			}
			else
			{
				audio.pause();
			}
		};

		that.play = function ()
		{
			audio.play();
		};

		that.pause = function ()
		{
			audio.pause();
		};

		that.onEnd = function (callback)
		{
			audio.onended = callback;
		};

		that.create = function (a)
		{
			audio = audioManager.create(a);
		};

		return that;

	} ();

	/**
	 * Local storage
	 */
	var storage =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, JSON.stringify(value));
		},
		getCurrent: function(lessonId)
		{
			var l = JSON.parse($storage.local.getItem('lessons'));

			if (l && l[lessonId])
			{
				return parseInt(l[lessonId].current);
			}

			return 0;
		},
		getLessons: function ()
		{
			return JSON.parse($storage.local.getItem('lessons')) || [];
		},
		setString: function(name, value)
		{
			$storage.local.setItem(name, value);
		},
		getString: function(name)
		{
			return $storage.local.getItem(name);
		}
	};

	function currentSubLesson()
	{
		return scope.lesson.sub[scope.subIndex];
	}

	function next()
	{
		var ch = scope.char = currentSubLesson().character[audioIndex];

		if (ch)
		{
			var m = ch.marker;

			audioWrapper.create(ch.audio);
			audioWrapper.play();

			scope.audioPause = false;

			tryShowHint(ch, function ()
			{
				scope.audioPause = true;
				audioIndex++;
				next();
				scope.$apply();
			});

			if (m)
			{
				markerId = markerService.paintMarker(editorSession, m.x1, m.y1, m.x2, m.y2, m.type);
			}
			else
			{
				markerService.deleteMarkerAndAnnotation(editorSession, markerId);
			}
		}
	}

	function tryShowHint (char, callback)
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
						audioWrapper.onEnd(callback);
					}
				}
			});

			enjoyHint.set(hint);
			enjoyHint.run();

			if (!char.waitForHint)
			{
				audioWrapper.onEnd(function ()
				{
					enjoyHint && enjoyHint.trigger("skip");
					callback && callback();
				});
			}
		}
		else
		{
			audioWrapper.onEnd(callback);
		}
	}

	function initCode()
	{
		var current = currentSubLesson();

		connection.httpGetLessonCodeFromJs(lessonId, scope.subIndex, function (data)
		{
			editorSession.setValue(data);
			options.code = data;

			// Слова BBot'а
			scope.textBot = current.defaultBBot && current.defaultBBot();
			scope.nextSubLesson = nextSubLesson;
			scope.isGameLesson = scope.lesson.isGameLesson;

			next();
		});
	}

	function saveStatistics(args)
	{
		// Устанавливаем текущий
		args.statistic[args.lessonId] =
		{
			current: args.current + 1,
			size: args.size + 1,
			completed: args.completed
		};

		storage.set('lessons', args.statistic);
		connection.httpSaveStatisticLesson(args);
	}

	function nextSubLesson()
	{
		// Обновляем игровые объекты на начальные значения или нет
		options.resetGame = currentSubLesson().handleUpdate;
		options.isCodeRunning = false;
		options.update = false;

		// Размер массива подуроков с 0
		var size = scope.lesson.sub.length - 1;

		// Текущий объект статистики уроков
		var statistic = storage.getLessons();

		if (scope.subIndex !== size)
		{
			++scope.subIndex;

			initCode();

			saveStatistics({
				current: scope.subIndex,
				statistic: statistic,
				lessonId: lessonId,
				size: size
			});
		}
		else
		{
			saveStatistics({
				current: 0,
				statistic: statistic,
				lessonId: lessonId,
				size: size,
				complete: true
			});

			scope.starsHide = true;
		}

		markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		audioIndex = 0;
		scope.textContent = false;
	}

	function initialize(args)
	{
		audioIndex = 0;
		scope = args.scope;
		lessonId  = args.lessonId;

		options.code = '';

		// Получаем урок из локального хранилища
		var ls = storage.getCurrent(lessonId);

		scope.subIndex = 0;

		if(!ls)
		{
			// Идем в базу за статой по урокам
			connection.httpGetLessonsStatisticsFromDataBase(function(result)
			{
				if(result.data[lessonId])
				{
					var size = scope.lesson.sub.length;
					var serverIndex = parseInt(result.data[lessonId].current);

					// Индекс под урока
					scope.subIndex = serverIndex % size;
					initCode();
				}
			});
		}
		else
		{
			scope.subIndex = ls - 1;
			initCode();
		}
	}

	function text(message, nextSubLesson)
	{
		scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		scope.nextSubLesson = nextSubLesson;
	}

	function runNotGameLesson(current)
	{
		options.isCodeRunning = true;

		if (current.result)
		{
			options.result = interpreter.execute(options.code);

			var result = current.result(options.result);

			scope.botCss = result.css;

			if (result.status)
			{
				text(result.message, nextSubLesson);
			}
			else
			{
				text(result.message);
			}
		}

		options.isCodeRunning = false;
	}

	function runGameLesson(current)
	{
		if (current.handleUpdate)
		{
			options.isCodeRunning = !options.isCodeRunning;

			options.update = function (args)
			{
				var s = args.spaceCraft;
				var w = args.world;
				var t = args.text;

				var result = current.handleUpdate(s, w, t);

				if (result && result.status)
				{
					text(result.message, nextSubLesson);
				}
				else if (t)
				{
					text(t);
				}
			}
		}
	}

	function run()
	{
		var current = currentSubLesson();

		if (current.isNotGameLesson)
		{
			runNotGameLesson(current);
		}
		else
		{
			runGameLesson(current);
		}
	}

	function lessonContent(num)
	{
		return lessonsArray[num](storage).lessonContent;
	}

	function setEditorSession (value)
	{
		editorSession = value;
	}

	function getEditorSession ()
	{
		return editorSession;
	}

	function getCode()
	{
		return editorSession.getDocument().getValue();
	}

	function getMarkerId()
	{
		return markerId;
	}

	function setMarkerId(id)
	{
		markerId = id;
	}

	return {
		setEditorSession: setEditorSession,
		getEditorSession: getEditorSession,
		getCode: getCode,
		lessonContent: lessonContent,
		initialize: initialize,
		run: run,
		getMarkerId: getMarkerId,
		setMarkerId: setMarkerId,
		audioManager: audioWrapper,
		options: options
	}
}]);
