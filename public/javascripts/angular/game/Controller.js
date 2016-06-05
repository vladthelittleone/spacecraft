/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', 'audioManager',
	'connection', 'gameService', 'aceService', 'markerService',
function ($scope, audioManager, connection, gameService, aceService, markerService)
{
	var audio = audioManager.createWithPlayList();
	var editorSession;
	var markerId;

	function errorWrapper (value)
	{
		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста исправте ситуацию.</p>';
	}

	$scope.hideEditor = false;
	$scope.hideDoc = true;
	$scope.textBot = '';
	$scope.options =
	{
		isCodeRunning: false,
		code: "",
		error: null
	};

	$scope.toggleCodeRun = function ()
	{
		$scope.options.isCodeRunning = !$scope.options.isCodeRunning;

		// Сохраняем код только при нажатии на кнопку плей
		if($scope.options.isCodeRunning)
		{
			connection.httpSaveCode($scope.options.code);
		}
	};

	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	$scope.toggleDocOpen = function ()
	{
		$scope.hideDoc = !$scope.hideDoc;
	};

	$scope.aceChanged = function ()
	{
		$scope.options.code = editorSession.getDocument().getValue();

		gameService.setCode($scope.options.code);
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();

		aceService.initializeAceSettings(editor, $scope.options.code);

		gameService.setCode($scope.options.code);

		gameService.initCode(function(data)
		{
			editorSession.setValue(data);
		});
	};

	$scope.$watch('options.error', function (value)
	{
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		$scope.textBot = value;

		if (value)
		{
			console.log($scope.options.error.stack);
			var errorLine = $scope.options.error.stack.split(':')[6] - 2;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, errorLine, $scope.options.error);
		}
	});

	$scope.$watch ('$viewContentLoaded', function()
	{
		audio.play();
	});
}]);
