'use strict';

var joint = require('jointjs');

Diagram.$inject = ['$sce'];

module.exports = Diagram;

/**
 * Директива контроля доски BBot'а.
 *
 * @since 03.09.16
 * @author Skurishin Vladislav
 */
function Diagram() {

	var directive = {
		templateUrl: 'views/directives/diagram.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link() {

		var graph = new joint.dia.Graph;

		var paper = new joint.dia.Paper({
			el: $('#diagram'),
			width: 600,
			height: 200,
			model: graph,
			gridSize: 1
		});

		var rect = new joint.shapes.basic.Rect({
			position: { x: 100, y: 30 },
			size: { width: 100, height: 30 },
			attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
		});

		var rect2 = rect.clone();
		rect2.translate(300);

		var link = new joint.dia.Link({
			source: { id: rect.id },
			target: { id: rect2.id }
		});

		graph.addCells([rect, rect2, link]);

	}

}
