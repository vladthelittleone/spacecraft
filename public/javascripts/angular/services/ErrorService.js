/**
 * Created by Ivan on 11.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.errorService', []);

app.factory('errorService', [ function ()
{
	var Range = ace.require('ace/range').Range;
	var markerID = null;

	function deleteMarker  (editorSession)
	{
		if (markerID != null)
		{
			// Удаляем старый маркер, что бы не получилось их много
			editorSession.removeMarker(markerID);
		}
	}

	function paintMarker (editorSession, foundedStringNumb)
	{
		// по какимто причинам не получается выделить одну строку, нужно как миимум две.
		markerID = editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");
	}

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

	var setMarkerAndAnnotation = function (editorSession, foundedStringNumb, error)
	{
		deleteMarker(editorSession);

		paintMarker(editorSession, foundedStringNumb);

		editorSession.setAnnotations([{
			row: foundedStringNumb,
			column: 0,
			text: error.toString(),
			type: "error"
		}]);
	};

	return{
		errorWrapper: errorWrapper,
		deleteMarkerAndAnnotation: deleteMarkerAndAnnotation,
		setMarkerAndAnnotation: setMarkerAndAnnotation
	}
}]);
