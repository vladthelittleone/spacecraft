'use strict';

module.exports = TableDirective;

/**
 * Директива таблицы для инфы в уроке
 *
 * Created by vaimer on 26.04.17.
 */
function TableDirective() {

	var directive = {
		templateUrl: 'views/directives/table-lesson.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.tableOptions = {
			scrollbarV: false
		};

		$scope.tableData = [
			{ name: 'Austin', gender: 'Male' },
			{ name: 'Marjan', gender: 'Male' }
		];
	}
}
