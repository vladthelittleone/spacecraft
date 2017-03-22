'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Scanning();

/**
 * Урок - 'Сканирование места аварии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Scanning() {

	return {
		title:             'Сканирование',
		content:           content,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Включите сканирование с помощью команды: <span class="red-label">scout.scan()</span>.</li>' +
						   '<li>Не забудьте про точку с запятой.</li>' +
						   '</ul>',
		hint:              '<ul>' +
						   '<li>Добавьте <span class="under-label-gray">scout.scan();</span> на <strong>8</strong> строку.</li>' +
						   '</ul>',
		character:         [{
			audio: 'audio/lesson3/2-1',
			css:   'astromen-img'
		}],
		gamePostUpdate:    gamePostUpdate
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({
			correct: '<p>BBot начинает сканирование местности!</p>'
		});

		if (scout.isScanningActivated()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Вы на месте. Включите сканирование, нам необходимо найти следы взломщиков.</p>';

	}

}
