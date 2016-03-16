/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http', '$storage', 'lessonProvider', 'interpreter',
	function ($scope, $stateParams, $state, $http, $storage, lessonProvider, interpreter)
{
	function getCurrent(name)
	{
		$http.get('/statistic/lessonscomplete').success(function(data)
		{
			console.log("In get Current = 1");
			console.log("lessons = " + parseInt(data[name].current));
			return parseInt(data[name].current) || 0;
		});
		console.log("In get Current = 2");
	}

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
		// Слова BBot'а
		$scope.textBot = current().defaultBBot;

		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		if (i !== len)
		{
			options.code = initCode(++$scope.subIndex);

			$http({
				url: '/statistic/lessonscomplete',
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
			$state.go('lessons');
		}
	}

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.editorOptions =
	{
		isCodeRunning: false,
		code: '',
		error: null
	};

	function initCode(i)
	{
		console.log("initCode = " + i);
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
			$scope.nextSubLesson = nextSubLesson;
		});
	}

	initCode(getCurrent($stateParams.id) || 0);

	//===================================
	//============== SCOPE ==============
	//===================================

	// Индекс под урока
	$scope.subIndex = getCurrent($stateParams.id) || 0;
	console.log("$scope.subIndex" + $scope.subIndex);
	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function ()
	{
		options.isCodeRunning = true;

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

		options.isCodeRunning = false;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
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
}]);
