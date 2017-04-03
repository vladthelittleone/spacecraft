'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var lodash = require('lodash');

module.exports = loadingStock();

/**
 * Created by vaimer on 19.02.2017.
 */
function loadingStock() {

	return {
		isRestartDisabled: true,
		title:        'Погрузка датчика',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
				'<li>Добавьте <span class="under-label-gray">harverster.loadToCargo(container);</span> на <strong>13</strong> строку.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  	'<li>На строке <strong>13</strong> необходимо использовать функцию корабля <span class="red-label">loadToCargo(container)</span>.</li>' +
					  	'<li>Затем передать в нее переменную <span class="red-label">container</span>. Для погрузки на корабль.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester) {

		var lessonResults = LessonResults({
			correct: '<p>П0грузка прошла успешно!</p>'
		});

		if (harvester.isUseCargo() &&
			lodash.isEqual(harvester.getFromCargo(), 'Вражеский датчик')) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Отлично кадет, вы прошли вводный курс, теперь можно приступать к заданию.</p>' +
			   '<p>Вам необходимо поместить датчик в грузовой отсек корабля. </p>' +
			   '<p>Это можно сделать воспользовавшимь функцией <span class="under-label">loadToCargo()</span></p>';

	}
}
