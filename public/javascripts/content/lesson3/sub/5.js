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
			audio: 'audio/lesson4/5-1',
			css:   'astromen-img'
		}, {
			audio:  'audio/lesson4/5-2',
			css:    'astromen-img',
			marker: {
				x1: 17,
				y2: Infinity
			},
			hint:   [{
				'next .ace_scroller': 'Поместите датчик на корабль',
				'nextButton':         {text: 'Далее'},
				'showSkip':           false
			}]
		}, {
			audio: 'audio/lesson4/5-3',
			css:   'astromen-img',
			hint:  [{
				'click .lesson-alt-hint': 'Нажмите для получения инструкций',
				'nextButton':             false,
				'showSkip':               false
			}]
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>На строке <strong>17</strong> необходимо использовать команду <span class="red-label">harvester.loadCargo(container)</span>.</li>' +
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
			lodash.isEqual(harvester.unloadCargoWithoutFlag(), 'Вражеский датчик')) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Отлично кадет, вы прошли вводный курс, теперь можно приступать к заданию.</p>' +
			'<p>Вам необходимо поместить датчик в грузовой отсек корабля. Это можно сделать с помощью команды:</p>' +
			'<pre><strong>harvester</strong>.loadCargo(container);</pre>';

	}
}
