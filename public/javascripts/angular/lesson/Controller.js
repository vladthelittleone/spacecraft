/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http', 'lessonService',
	'lessonProvider', 'interpreter', 'audioManager', 'connection', 'aceService', 'markerService',
	function ($scope, $stateParams, $state, $http, lessonService,lessonProvider, interpreter, audioManager, connection, aceService, markerService)
{
	var markerId;

	$scope.starsHide = false;
	$scope.idLesson = $stateParams.id;

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.options = lessonService.getOptions();

	//===================================
	//============== SCOPE ==============
	//===================================

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);
	$scope.hideEditor = false;
	$scope.audioPause = false;
	$scope.textContent = false;
	$scope.hint = false;

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = function()
	{
		lessonService.codeRun($scope, editorSession);
	};

	$scope.toggleTextContent = function ()
	{
		$scope.textContent = !$scope.textContent;
	};

	$scope.toggleAudioPause = lessonService.toggleAudioPause($scope);


	$scope.previousAudio = lessonService.previousAudio($scope);


	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
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

		aceService.initializeAceSettings(editor, options.code);

		lessonService.initialize($scope, $stateParams.id, editorSession);
	};

	function errorWrapper (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	}

	$scope.$watch('options.error', function (value)
	{
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);
		$scope.textBot = value;

		if (value)
		{
			var foundedStringNumb = $scope.options.error.stack.split(':')[6] - 2;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, foundedStringNumb, $scope.options.error);
		}
	});

	//===================================
	//============== AUDIO ==============
	//===================================

	var soundtrack = audioManager.createWithPlayList();

	$scope.$watch ('$viewContentLoaded', function()
	{
		soundtrack.play();
	});
}]);
