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
					  '<li>Для объявления или, другими словами, создания переменной используется ключевое слово var:</li>' +
					  '<li><span class="under-label">var language;</span></li>' +
					  '<li>После объявления, можно записать в переменную данные(инициализация):</li>' +
					  '<li><span class="under-label">language = "JavaScript";</span> // сохраним в переменной строку</li>' +
					  '<li>Для краткости можно совместить объявление переменной и запись данных:</li>' +
					  '<li><span class="under-label">var language = "JavaScript";</span></li>' +
					  '<li>Проще всего понять переменную, если представить её как «коробку» для данных, с уникальным именем.</li>' +
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
