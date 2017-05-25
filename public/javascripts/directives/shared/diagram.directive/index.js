'use strict';

var joint = require('jointjs');
var angular = require('angular');

var DiagramService = require('./diagram');

module.exports = Diagram;

/**
 * Директива контроля доски BBot'а.
 *
 * @since 03.09.16
 * @author Skurishin Vladislav
 */
function Diagram() {

	var directive = {
		link:     link,
		restrict: 'E',
		scope:    {
			params: '='
		}
	};

	return directive;

	function link(scope, element) {

		var gridSize = scope.params.gridSize;
		var graph = scope.params.graph;

		// Высота и ширина диграммы равна h / w элемента директивы.
		var diagram = newDiagram(element.height(), element.width(), gridSize, graph, element[0]);

		//add event handlers to interact with the diagram
		diagram.on('cell:pointerclick', diagramCellPointerClick);
		diagram.on('blank:pointerclick', diagramBlankPointerClick);
		diagram.on('link:options', linkOptions);

		scope.$watch(diagramWidth, onResize);
		scope.$watch(diagramHeight, onResize);

		DiagramService.setDiagram(graph);

		/**
		 * При изменении окна рутового изменяется и диграмма.
		 */
		function onResize() {

			diagram && diagram.setDimensions(element.width(), element.height());

		}

		function diagramBlankPointerClick(cellView, evt, x, y) {

			//your logic here e.g. select the element

		}

		function diagramCellPointerClick(evt, x, y) {

			// your logic here e.g. unselect the element by clicking on a blank part of the diagram
		}

		function linkOptions(evt, cellView, x, y) {

			// your logic here: e.g. select a link by its options tool
		}

		function diagramWidth() {

			return element.width();

		}

		function diagramHeight() {

			return element.height();

		}

	}

	function newDiagram(height, width, gridSize, graph, targetElement) {

		return new joint.dia.Paper({
			el:       targetElement,
			width:    width,
			height:   height,
			gridSize: gridSize,
			model:    graph
		});

	}

}
