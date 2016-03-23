/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http',
	'$storage', 'lessonProvider', 'interpreter',
	function ($scope, $stateParams, $state, $http, $storage, lessonProvider, interpreter)
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

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	function initialize(id)
	{
		var ls = st.getCurrent(id);

		if(!ls && id != '0')
		{
			$http.get('/statistic/lessons').then(function(result)
			{
				if(result.data.length)
				{
					// Индекс под урока
					$scope.subIndex = parseInt(result.data[id].current);
					initCode($scope.subIndex);
				}
			});
		}
		else
		{
			$scope.subIndex = ls;
			initCode(ls);
		}
	}

	initialize($stateParams.id);

	function current()
	{
		return $scope.lesson.sub[$scope.subIndex];
	}

	function error(message)
	{
		$scope.textBot = message;

		// Удаляем кнопку 'Далее' тк получили ошибку.
		$scope.nextSubLesson = null;
	}

	function success(message)
	{

		$scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		$scope.nextSubLesson = nextSubLesson;
	}

	function nextSubLesson()
	{
		options.nextSubLesson = true;
		options.isCodeRunning = false;

		function set(a, i, len, completed)
		{
			// Устанавливаем текущий
			a[$stateParams.id] = {
				current: i + 1,
				size: len + 1,
				completed: completed
			};

			st.set('lessons', a);
		}

		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		// Текущий объект статистики уроков
		var l = st.getLessons();

		if (i !== len)
		{
			options.code = initCode(++$scope.subIndex);

			// Устанавливаем текущий урок в хранилище
			set(l, $scope.subIndex, len);

			$http({
				url: '/statistic/lessons',
				method: 'POST',
				data: {
					lessonId: $stateParams.id,
					size: len,
					current: $scope.subIndex
				}
			});
		}
		else
		{
			// Устанавливаем текущий урок в хранилище
			set(l, 0, len, true);

			$http({
				url: '/statistic/lessons',
				method: 'POST',
				data: {
					lessonId: $stateParams.id,
					size: len,
					current: 0,
					completed: true
				}
			});

			$state.go('lessons');
		}
	}

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.options =
	{
		isCodeRunning: false,
		code: '',
		error: null
	};

	function initCode(i)
	{
		$http({
			method: 'GET',
			url: 'javascripts/code/lesson' + $stateParams.id + '/' + i + '.js'
		})
		.success(function (date)
		{
			editorSession.setValue(date);
			options.code = date;

			// Слова BBot'а
			$scope.textBot = current().defaultBBot;
			$scope.isGameLesson = $scope.lesson.isGameLesson;
			$scope.nextSubLesson = nextSubLesson;
		});
	}


	//===================================
	//============== SCOPE ==============
	//===================================

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function ()
	{
		if (!$scope.isGameLesson)
		{
			options.isCodeRunning = true;

			if (current().result)
			{
				options.result = interpreter.execute(options.code);

				var result = current().result(options.result);

				if (result.status)
				{
					success(result.message);
				}
				else
				{
					error(result.message);
				}
			}
			else
			{

			}

			options.isCodeRunning = false;
		}
		else
		{
			options.isCodeRunning = !options.isCodeRunning;

			options.update = function (s, w, t)
			{
				var result = current().handleUpdate(s, w, t);

				if (result && result.status)
				{
					success(result.message);
				}
			}
		}
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	function full(c, n)
	{
		var str = '';

		for (var i = 0; i < n; i++)
		{
			str += c;
		}

		return str;
	}

	$scope.aceChanged = function ()
	{
		// editorSession.replace(new Range(0, 0, editorSession.getLength() - 1, options.code.length), full('*', options.code.length));
		options.code = editorSession.getDocument().getValue();
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editor.setOption("scrollPastEnd", true);

		// Скролл до конца. Т.е. скролл есть всегда.
		editorSession.setValue(options.code);
	};

	function errorWrapper(value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	}

	var Range = ace.require('ace/range').Range;
	var markerID = null;

	$scope.$watch('options.error', function (value)
	{
		if (value)
		{
			$scope.textBot = errorWrapper(value);

			var foundedStringNumb = $scope.options.error.stack.split(':')[3] - 1;

			if (markerID != null)
			{
				// Удаляем старый маркер, что бы не получилось их много
				editorSession.removeMarker(markerID);
			}

			// по какимто причинам не получается выделить одну строку, нужно как миимум две.
			markerID = editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");

			editorSession.setAnnotations([{
				row: foundedStringNumb,
				column: 0,
				text: $scope.options.error.toString(),
				type: "error"
			}]);
		}
		else
		{
			$scope.textBot = value;

			// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
			// но но мало ли, что лучше удалять их явно
			editorSession.clearAnnotations();
			editorSession.removeMarker(markerID);
		}
	});
}]);
