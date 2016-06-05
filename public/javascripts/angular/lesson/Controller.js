/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state',
	'lessonService', 'audioManager', 'aceService', 'markerService',
	function ($scope, $stateParams, $state, lessonService, audioManager, aceService, markerService)
{
	$scope.starsHide = false;
	$scope.idLesson = $stateParams.id;
	$scope.hideEditor = false;
	$scope.audioPause = false;
	$scope.textContent = false;
	$scope.hint = false;
	$scope.options = lessonService.options;
	$scope.lesson = lessonService.lessonContent($stateParams.id);

	lessonService.initialize({
		lessonId : $stateParams.id,
		scope: $scope
	});

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = lessonService.run;

	$scope.toggleTextContent = function ()
	{
		$scope.textContent = !$scope.textContent;
	};

	$scope.toggleAudioPause = function ()
	{
		lessonService.audioManager.toggleAudio($scope.audioPause);
		$scope.audioPause = !$scope.audioPause;
	};

	$scope.previousAudio = function ()
	{
		 if (lessonService.audioManager.previousAudio())
		 {
			 $scope.audioPause = false;
		 }
	};


	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	$scope.aceChanged = function ()
	{
		$scope.options.code = lessonService.getCode();
	};

	$scope.aceLoaded = function (editor)
	{
		lessonService.setEditorSession(editor.getSession());
		aceService.initializeAceSettings(editor, $scope.options.code);
	};

	function errorWrapper (value)
	{
		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста исправте ситуацию.</p>';
	}

	$scope.$watch('options.error', function (value)
	{
		var editorSession = lessonService.getEditorSession();
		var markerId = lessonService.getMarkerId();

		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		$scope.textBot = value;

		if (value)
		{
			var errorLine = $scope.options.error.stack.split(':')[6] - 1;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, errorLine, $scope.options.error);
			lessonService.setMarkerId(markerId);
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
