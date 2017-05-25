'use strict';

LessonTable.$inject = ['$sce'];

module.exports = LessonTable;

/**
 * Директива таблицы для инфы в уроке
 *
 * Формат данных  для таблицы:
 * {
 *   columns: ['Name', 'Gender', 'Email'],
 *   rows: [
 *           ['Villy', 'Lory', 'Candal'],
 *           ['Cooper', 'Lox', 'Priest']
 *        ]
 * }
 *
 * Created by vaimer on 26.04.17.
 */
function LessonTable($sce) {
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

		$scope.hide = true;
		$scope.trustAsHtml = trustAsHtml;


		$scope.$watch('lessonTableData', onLessonTableChange);

		function onLessonTableChange(n, o) {

			$scope.hide = !n;

		}
	}

	// Проверка мошеничества
	function trustAsHtml(str) {

		return $sce.trustAsHtml(str);

	}
}
