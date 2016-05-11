/**
 * Created by Ivan on 11.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.errorService', []);

app.factory('errorService', [ function ()
{
	var Range = ace.require('ace/range').Range;

	var deleteMarker = function (editorSession, markerID)
	{
			// Удаляем старый маркер, что бы не получилось их много
			editorSession.removeMarker(markerID);
	};

	var paintMarker = function (editorSession, foundedStringNumb)
	{
		// по какимто причинам не получается выделить одну строку, нужно как миимум две.
		return editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");
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

	var setMarkerAndAnnotation = function (editorSession, foundedStringNumb, error, markerId)
	{
		if(markerId)
		{
			deleteMarker(editorSession, markerId);
		}

		var markerId = paintMarker(editorSession, foundedStringNumb);

		editorSession.setAnnotations([{
			row: foundedStringNumb,
			column: 0,
			text: error.toString(),
			type: "error"
		}]);

		return markerId
	};

	return{
		errorWrapper: errorWrapper,
		deleteMarkerAndAnnotation: deleteMarkerAndAnnotation,
		setMarkerAndAnnotation: setMarkerAndAnnotation,
		deleteMarker: deleteMarker,
		paintMarker: paintMarker
	}
}]);
