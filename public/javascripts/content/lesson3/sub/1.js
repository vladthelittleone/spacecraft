'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 31.01.17.
 */

module.exports = UseVariables();


function UseVariables() {

	return {
		title:        'JavaScript переменные(Погрузка)',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>Нажмите для демонстрации работы кода.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Что нас понизили до погрузки?</p>' +
					 '<p>Дайте мне другого человка, порасторопней:)</p>'
		});

		if (spaceCraft.isUseCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Тут какой-то контент!</p>';

	}
}
