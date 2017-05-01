'use strict';

module.exports = LessonTable;

/**
 * Директива таблицы для инфы в уроке
 *
 * Created by vaimer on 26.04.17.
 */
function LessonTable() {

	var directive = {
		scope: {},
		templateUrl: 'views/directives/lesson-table.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.dataTable = {
			columns: ['Name', 'Gender', 'Email'],
			data: [
				['Villy', 'Lory', 'Candal'], 
				['Cooper', 'Lox', 'Priest']
			]
		}
	}
}
