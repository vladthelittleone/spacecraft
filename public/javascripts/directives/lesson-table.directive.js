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

		$scope.options = {
			scrollBarWidth: 5,
			rowHeight: 50,
			footerHeight: false,
			headerHeight: 50,
			scrollbarV: true,
			emptyMessage: 'Nothing to show...',
			columns: [{
				name: "Name",
				prop: "name",
				width: 300
			}, {
				name: "Gender",
				prop: "gender",
				width: 300
			}, {
				name: "Company",
				prop: "company",
				width: 300
			}]
		};

		$scope.dataArray = [
			{ Name: 'Austin', Gender: 'Male', Company: 'ccc' },
			{ Name: 'Marjan', Gender: 'Male', Company: 'gggg' }
		];
	}
}
