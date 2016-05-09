/**
 * Created by Ivan on 09.05.2016.
 */

'use strict';

var app = angular.module('spacecraft.aceService', []);

app.factory('aceService', ['autocompleter', function (autocompleter)
{
	var Range = ace.require('ace/range').Range;
	var markerID = null;

	var deleteMarker = function (editorSession)
	{
		if (markerID != null)
		{
			// Удаляем старый маркер, что бы не получилось их много
			editorSession.removeMarker(markerID);
		}
	};

	var allocationMarker = function (editorSession, foundedStringNumb)
	{
		// по какимто причинам не получается выделить одну строку, нужно как миимум две.
		markerID = editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");
	};

	var deleteMarkerAndAnnotation = function (editorSession)
	{
		// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
		// но но мало ли, что лучше удалять их явно
		editorSession.clearAnnotations();
		editorSession.removeMarker(markerID);
	};

	var errorWrapper = function (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	};

	var firstAceSetting = function (editor, editorSession, code)
	{

		editor.$blockScrolling = Infinity;
		editorSession.setValue(code);

		// Скролл до конца. Т.е. скролл есть всегда.
		editor.setOption("scrollPastEnd", true);
	};

	var secondAceSetting = function (editor)
	{
		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
			{
				enableSnippets: false,
				enableBasicAutocompletion: true
			});

		langTools.addCompleter(spaceCraftCompleter);
	};

	return{
		errorWrapper: errorWrapper,
		deleteMarker: deleteMarker,
		allocationMarker: allocationMarker,
		firstAceSetting: firstAceSetting,
		deleteMarkerAndAnnotation: deleteMarkerAndAnnotation,
		secondAceSetting: secondAceSetting
	};
}]);
