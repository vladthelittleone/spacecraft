'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */
module.exports = FlightWithInstructions();


function FlightWithInstructions() {

	return {
		title:        'Перевозка груза к защитной турели(Теория перемнных)',
		character:    [{
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'click .enhoyhint-play': 'Запустите код',
					'nextButton':             false,
					'showSkip':               false
				}
			]
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   3,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   14,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
		'<li>Для объявления или, другими словами, создания переменной используется ключевое слово <span class="red-label">var</span>.</li>' +
		'<li><span class="red-label">var enemy;</span> - ример объявления переменной</li>' +
		'<li>После объявления, можно записать в переменную данные(инициализация):</li>' +
		'<li><span class="red-label">language = "PHP in my enemy";</span> - записываем в переменную строку.</li>' +
		'<li>Для краткости можно совместить объявление переменной и запись данных:</li>' +
		'<li><span class="red-label">var language = "JavaScript";</span></li>' +
		'<li>Имена переменных содержат буквы, цыфры, нижниее подчеркивание.</li>' +
		'<li>Имя переменной не может начинаться с цыфры.</li>' +
		'<li>Переменный буквы, которвых в различных регистрах разные переменные:</li>' +
		'<li><span class="red-label">Container</span> и <span class="red-label">container</span> разные переменные</li>' +
		'</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>И в какую дыру нас еще зашлют?</p>'
		});

		if (spaceCraft.isWithinCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Тут какой-то контент!</p>';

	}
}

