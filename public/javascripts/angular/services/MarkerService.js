/**
 * Created by Ivan on 11.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.markerService', []);

app.factory('markerService', [ function ()
{
	var Range = ace.require('ace/range').Range;

	var paintMarker = function (editorSession, x1, y1, x2, y2, type)
	{
		x1 = x1 - 1;
		x2 = x2 || x1;

		if (!type)
		{
			return editorSession.highlightLines(x1, x2, 'bar').id;
		}
		else
		{
			// по какимто причинам не получается выделить одну строку, нужно как миимум две.
			return editorSession.addMarker(new Range(x1, y1, x2, y2), 'bar', type);
		}
	};

	var deleteMarkerAndAnnotation = function (editorSession, markerId)
	{
		// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
		// но но мало ли, что лучше удалять их явно
		editorSession.clearAnnotations();
		editorSession.removeMarker(markerId);
	};



	var setMarkerAndAnnotation = function (editorSession, errorLine, error)
	{
		var markerId = paintMarker(editorSession, errorLine);

		editorSession.setAnnotations([{
			row: errorLine - 1,
			column: 0,
			text: error.toString(),
			type: "error"
		}]);

		return markerId
	};

	return{
		deleteMarkerAndAnnotation: deleteMarkerAndAnnotation,
		setMarkerAndAnnotation: setMarkerAndAnnotation,
		paintMarker: paintMarker
	}
}]);
