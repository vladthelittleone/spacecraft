/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', '$storage', '$http', 'autocompleter',
function ($scope, $storage, $http, autocompleter)
{
	//===================================
	//============== CODE ===============
	//===================================

	function initCode()
	{
		var code = $storage.local.getItem('code') || "";

		// Если в локальном хранилище нет кода, то берем из js
		if (!code)
		{
			$http({method: 'GET', url: 'scripts/code/game.js'})
				.success(function (date)
				{
					editorSession.setValue(date);
					code = date;
				});
		}

		return code;
	}

	var code = initCode();

	//===================================
	//============== SCOPE ==============
	//===================================

	$scope.textBot = '';
	$scope.options =
	{
		isCodeRunning: false,
		code: code,
		error: null,
		result: null
	};

	$scope.toggleCodeRun = function ()
	{
		$scope.options.isCodeRunning = !$scope.options.isCodeRunning;
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

	$scope.tipsAndTricks = { hide: $storage.local.getItem('tipsAndTricks') };

	$scope.toggleTipsAndTricks = function ()
	{
		$scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		$scope.options.code = editorSession.getDocument().getValue();
		$storage.local.setItem('code', $scope.options.code);
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editorSession.setValue($scope.options.code);

		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
		{
			enableSnippets: false,
			enableBasicAutocompletion: true
		});

		langTools.addCompleter(spaceCraftCompleter);

		$storage.local.setItem('code', $scope.options.code);
	};

	var Range = ace.require('ace/range').Range;
	var markerID = null;

	$scope.$watch('options.error', function (value)
	{
		$scope.textBot = value;

		if ($scope.options.error != false && $scope.options.error != null)
		{
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
			// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
			// но но мало ли, что лучше удалять их явно
			editorSession.clearAnnotations();
			editorSession.removeMarker(markerID);
		}
	});
}]);
