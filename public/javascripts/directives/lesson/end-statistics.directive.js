'use strict';

module.exports = EndStatistics;

/**
 * Директива вывода статистики в конце урока.
 *
 * Created by iretd on 09.08.2016.
 */
function EndStatistics() {

	var directive =  {
		scope:       {
			lesson:  '='
		},
		templateUrl: 'views/directives/lesson/end-statistics.html',
		link:		 link,
		restrict:    'EA'
	};

	return directive;

	function link(scope) {

		// Дабы каждый раз в шаблоне не ходить за statistics через lesson,
		// создаем отдельную ссылку. Для удобства, не более того.
		scope.lessonStatistics = scope.lesson.lessonStatistics;

	}

}
