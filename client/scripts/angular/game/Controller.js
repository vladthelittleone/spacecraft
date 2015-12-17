/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', '$storage', 'autocompleter',
	function ($scope, $storage, autocompleter)
{
	//===================================
	//============== CODE ===============
	//===================================

	var code = $storage.local.getItem('code') || 'return { \n\t' +
		'run : function(spaceCraft, world) \n\t' +
		'{  \n\t\tspaceCraft.weapon.fire();  \n\t}  ' +
		'\n};';

	$scope.ep =
	{
		isCodeRunning: false,
		code: code,
		error: null
	};

	$scope.toggleCodeRun = function ()
	{
		$scope.ep.isCodeRunning = !$scope.ep.isCodeRunning;
	};

	//===================================
	//============== HIDE ===============
	//===================================

	$scope.hideEditor = false;
	$scope.hideTutorial = true;

	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	$scope.toggleTutorialOpen = function ()
	{
		$scope.hideTutorial = !$scope.hideTutorial;
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
		$scope.ep.code = editorSession.getDocument().getValue();
		$storage.local.setItem('code', $scope.ep.code);
	};

	$scope.aceLoaded = function (editor)
	{
		localEditor = editor;
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editorSession.setValue($scope.ep.code);

		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
		{
			enableSnippets: false,
			enableBasicAutocompletion: true
		});

		langTools.addCompleter(spaceCraftCompleter);

		$storage.local.setItem('code', $scope.ep.code);
	};

	var Range = ace.require('ace/range').Range;
	var markerID = null;

	$scope.$watch('ep.error', function ()
	{
		if ($scope.ep.error != false && $scope.ep.error != null)
		{
			// Ищем Номер строки которую нужно выделить,TODO навреное можно сделать проще
			// но выципить инфу о номере строки из ошибки не выйдет.
			var strings = $scope.ep.code.split('\n');
			var foundedStringNumb = 0;
			var foundString = new RegExp('.*' + $scope.ep.error.message.split(' ')[0] + '.*');

			for (var i = 0; i < strings.length; ++i)
			{
				if (foundString.test(strings[i]))
				{
					foundedStringNumb = i;
					break;
				}
			}
			// На тот случай если ошибка останется, а пользователь попробует
			// снова запустить игру, в отличии от анотации маркер сам не пропадет
			// и что бы не было маркера на маркере, или маркера в другом месте, удаляем предыдушийй маркер
			if (markerID != null)
			{
				editorSession.removeMarker(markerID);
			}

			// по какимто причинам не получается выделить одну строку, нужно как миимум две.
			markerID = editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");

			editorSession.setAnnotations([{
				row: foundedStringNumb,
				column: 0,
				text: $scope.ep.error.toString(),
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
