/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', '$storage', '$http', 'audioManager', 'connection', 'gameService', 'aceService', 'markerService',
function ($scope, $storage, $http, audioManager, connection, gameService, aceService, markerService)
{
	var editorSession;
	var markerId;

	//===================================
	//============== CODE ===============
	//===================================

	function initCode(callback)
	{
		// Вытаскиваем код из  локалного хранилища
		var code = gameService.getCode();

		// Если в локальном хранилище нет кода
		if (!code)
		{
			// Делаем запрос на получение коду от других источников выполняем callback
			gameService.requestForCode(callback);
		}
		else
		{
			callback(code);
		}
	}

	//===================================
	//============== SCOPE ==============
	//===================================

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

	//===================================
	//============== HIDE ===============
	//===================================

	$scope.hideEditor = false;
	$scope.hideDoc = true;

	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	$scope.toggleDocOpen = function ()
	{
		$scope.hideDoc = !$scope.hideDoc;
	};

	//===================================
	//============== EDITOR =============
	//===================================


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

		initCode (function(data)
		{
			editorSession.setValue(data);
		});
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
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);
		$scope.textBot = value;

		if (value)
		{
			var foundedStringNumb = $scope.options.error.stack.split(':')[6] - 1;
			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, foundedStringNumb, $scope.options.error);
		}
	});

	//===================================
	//============== AUDIO ==============
	//===================================

	var audio = audioManager.createWithPlayList();

	$scope.$watch ('$viewContentLoaded', function()
	{
		audio.play();
	});
}]);
