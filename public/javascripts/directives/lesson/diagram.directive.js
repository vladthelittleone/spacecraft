'use strict';

// Зависимости
var joint = require('jointjs');

module.exports = DiagramBoard;

/**
 * Директива вывода диаграммы уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function DiagramBoard() {

	var directive = {
		templateUrl: 'views/directives/lesson/diagram.html',
		controller: controller,
		restrict:    'EA'
	};

	return directive;

	function controller($scope) {

		var graph = new joint.dia.Graph;

		$scope.diagramParams = {
			gridSize: 1,
			graph:    graph
		};
	}

}
