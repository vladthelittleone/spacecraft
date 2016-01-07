/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http', 'lessonProvider', 'interpreter',
	function ($scope, $stateParams, $state, $http, lessonProvider, interpreter)
{
	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.editorOptions =
	{
		isCodeRunning: false,
		code: '',
		error: null,
		result: null
	};

	function initCode(i)
	{
		$http({
			method: 'GET',
			url: 'scripts/code/lesson' + $stateParams.id + '/' + i + '.js'
		})
		.success(function (date)
		{
			editorSession.setValue(date);
			options.code = date;
		});
	}

	initCode(0);

	//===================================
	//============== SCOPE ==============
	//===================================

	$scope.lesson = lessonProvider($stateParams.id);
	$scope.subIndex = 0;
	$scope.textBot = '';

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function ()
	{
		options.isCodeRunning = true;
		options.result = interpreter.execute(options.code);
		options.isCodeRunning = false;
	};

	$scope.nextSubLesson = function ()
	{
		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		if (i !== len)
		{
			options.code = initCode(++$scope.subIndex);
		}
		else
		{
			$state.go('lessons');
		}
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
		editorSession.setValue(options.code);
	};

	$scope.$watch('options.error', function (value)
	{
		$scope.textBot = value;
	});
}]);
