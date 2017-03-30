'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = TaskWithVariables();

/**
 * Created by vaimer on 19.02.2017.
 */
function TaskWithVariables() {

	return {
		isRestartDisabled: true,
		title:             'Копирование данных',
		character:         [{
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img'
		}, {
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img',
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>На <strong>3</strong> строчке объявите переменную <span class="red-label">container</span>, с помощью ключевого слова <span class="red-label">var</span></li>' +
					  '<li>Задайте ей значение <span class="red-label">"Ионная пушка"</span>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += e + '</br>';

				r = (e === 'Ионная пушка');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Еще 0дна к0р0бка вскрываю... транслирую...</p>' +
					 '<p class="bbot-output">' + t + '</p>',

			text: t

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Проверим насколько хорошо вы усвоили пройденный материал.</p>' +
			'<p>Вам необходимо объявить переменную container и иницилизовать ее значением "Ионная пушка".</p>';
	}
}
