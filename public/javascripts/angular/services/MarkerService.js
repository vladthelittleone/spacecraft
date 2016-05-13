/**
 * Created by Ivan on 11.05.2016.
 */
'use strict';

var app = angular.module('spacecraft.markerService', []);

app.factory('markerService', [ function ()
{
	var Range = ace.require('ace/range').Range;

	var paintMarker = function (editorSession, foundedStringNumb)
	{
		// по какимто причинам не получается выделить одну строку, нужно как миимум две.
		return editorSession.addMarker(new Range(foundedStringNumb, 0, foundedStringNumb + 1, 0), "bar", "fullLine");
	};

	var deleteMarkerAndAnnotation = function (editorSession, markerId)
	{
		// очищаем едитор от анотаций и маркеров, по идее анотации сами могут удалться,
		// но но мало ли, что лучше удалять их явно
		editorSession.clearAnnotations();
		editorSession.removeMarker(markerID);
	};



	var setMarkerAndAnnotation = function (editorSession, foundedStringNumb, error)
	{
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
		deleteMarkerAndAnnotation: deleteMarkerAndAnnotation,
		setMarkerAndAnnotation: setMarkerAndAnnotation,
		paintMarker: paintMarker
	}
}]);
