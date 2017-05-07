'use strict';

module.exports = LessonTable;

/**
 * Директива таблицы для инфы в уроке
 *
 * Created by vaimer on 26.04.17.
 */
function LessonTable() {

	// Формат данных  для таблицы
	// {
	// 	columns: ['Name', 'Gender', 'Email'],
	// 	rows: [
	// 			['Villy', 'Lory', 'Candal'],
	// 			['Cooper', 'Lox', 'Priest']
	// 		]
	// }
	var directive = {
		scope: {
			lessonTableData: '=' // Данные для таблицы
		},
		templateUrl: 'views/directives/lesson-table.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		// Stub

	}
}
