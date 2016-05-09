/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', '$storage', '$http', 'audioManager', 'connection', 'gameService', 'aceService',
function ($scope, $storage, $http, audioManager, connection, gameService, aceService)
{
	var editorSession;
	//===================================
	//============== CODE ===============
	//===================================

	function initCode(callback)
	{
		var code = gameService.getCode();

		// Если в локальном хранилище нет кода, то берем из базы, если нет там берем из js
		if (!code)
		{
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
			connection.saveCode($scope.options.code);
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
	//============== TIPS-TRICKS ========
	//===================================

	$scope.tipsAndTricks = { hide: gameService.getTipsAndTricks() };

	$scope.toggleTipsAndTricks = function ()
	{
		$scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
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

		aceService.firstAceSetting(editor, editorSession, $scope.options.code);

		aceService.secondAceSetting(editor);

		gameService.setCode($scope.options.code);

		initCode (function(data)
		{
			editorSession.setValue(data);
		});
	};

	$scope.$watch('options.error', function (value)
	{
		if (value)
		{
			$scope.textBot = aceService.errorWrapper(value);

			aceService.deleteMarker(editorSession);

			var foundedStringNumb = $scope.options.error.stack.split(':')[3] - 1;

			aceService.allocationMarker(editorSession, foundedStringNumb);

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

			aceService.deleteMarkerAndAnnotation(editorSession);
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
