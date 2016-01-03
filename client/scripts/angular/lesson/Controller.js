/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$storage', '$stateParams', '$state', '$http', 'lessonProvider',
	function ($scope, $storage, $stateParams, $state, $http, lessonProvider)
{
	//===================================
	//============== CODE ===============
	//===================================

	function initCode()
	{
		$http({method: 'GET', url: 'scripts/code/lesson1/' + $stateParams.id + '.js'})
			.success(function (date)
			{
				editorSession.setValue(date);
				code = date;
			});

		return "";
	}

	var code = initCode();

	var options = $scope.editorOptions =
	{
		isCodeRunning: false,
		code: code,
		error: null
	};

	//===================================
	//============== SCOPE ==============
	//===================================

	$scope.lesson = lessonProvider($stateParams.id);
	$scope.subIndex = 0;

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.toggleCodeRun = function ()
	{
		options.isCodeRunning = !options.isCodeRunning;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		options.code = editorSession.getDocument().getValue();
		$storage.local.setItem('code', options.code);
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editorSession.setValue(options.code);

		$storage.local.setItem('code', options.code);
	};
}]);
