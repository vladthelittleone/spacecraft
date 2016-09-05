'use strict';

module.exports = StatisticsLessonEnd;

/**
 * Директива вывода статистики в конце урока.
 *
 * Created by iretd on 09.08.2016.
 */
function StatisticsLessonEnd() {

	var directive =  {
		scope:       {
			lesson:  '='
		},
		templateUrl: 'views/directives/statistics-lesson-end.html',
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
