'use strict';

module.exports = LessonVideo;

/**
 * Created by vaimer on 26.05.17.
 */

function LessonVideo() {

	var directive = {
		scope: {
			url: '=' // Данные для таблицы
		},
		templateUrl: 'views/directives/lesson-video.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

	}

}
