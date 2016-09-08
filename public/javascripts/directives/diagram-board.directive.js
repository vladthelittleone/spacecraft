'use strict';

DiagramBoard.$inject = [];

module.exports = DiagramBoard;

/**
 * Директива вывода диаграммы уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function DiagramBoard() {

	var directive = {
		scope:       {
			lesson: '=' // информация о уроке
		},
		templateUrl: 'views/directives/diagram-board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {


	}

}
