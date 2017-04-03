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

		instructions: '<ul>' +
					  	'<li>На строке 13 необходимо использовать функцию корабля <span class="red-label">.loadToCargo(-container-)</span>.</li>' +
					  	'<li>И передать в нее переменную <span class="red-label">container</span>. Для погрузки на корабль.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({
			correct: '<p>П0грузка прошла успешн0!</p>'
		});

		if (scout.isUseCargo() &&
			lodash.isEqual(scout.getFromCargo(), 'Вражеский датчик')) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Отлично кадет, вы прошли вводный курс, теперь можно приступать к заданию.</p>' +
			   '<p>Вам необходимо поместить датчик в грузовой отсек корабля. </p>' +
			   '<p>Это можно сделать воспользовавшимь функцией <span class="under-label">.loadToCargo()</span></p>';

	}
}
