'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var lodash = require('lodash');

module.exports = TakingSensor();

/**
 * Created by vaimer on 19.02.2017.
 */
function TakingSensor() {

	return {
		isRestartDisabled: true,
		title:             'Погрузка датчика',
		character:         [{
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img',
		}, {
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img',
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>На строке <strong>13</strong> необходимо использовать команду <span class="red-label">harvester.cargoLoad(container)</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester) {

		var lessonResults = LessonResults({
			correct: '<p>Погрузка пр0шла успешно!</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',
		});

		if (harvester.isCargoLoad() &&
			harvester.isNearPoint(2170, 2080) &&
			lodash.isEqual(harvester.cargoUnloadWithoutFlag(), 'Вражеский датчик')) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Отлично кадет, вы прошли вводный курс, теперь можно приступать к заданию.</p>' +
			'<p>Вам необходимо поместить датчик в грузовой отсек корабля. Это можно сделать с помощью команды:</p>' +
			'<pre><strong>harvester</strong>.cargoLoad(container);</pre>';

	}
}
