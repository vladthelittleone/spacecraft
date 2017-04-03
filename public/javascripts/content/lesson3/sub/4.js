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
		title:             'Проверим ваши знания',
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
					  '<li>На <strong>3</strong> строчке объявите переменную <strong>container</strong>, с помощью ключевого слова <span class="red-label">var</span>.</li>' +
					  "<li>И задайте ей значение <strong>'Ионная пушка'</strong>.</li>" +

					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += 'Что обращает людей в пепел? -> ' + e + '</br>';

				r = (e === 'Ионная пушка');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Существует каверзный вопрос.</p>' +
					 '<p class="bbot-output">' + t + '</p>',

			text: 'Не забирайте у BBot`a игрушку!'

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Выполните небольшое задание, чтобы проверить усвоенный материал.</p>' +
			'<p>На <strong>3</strong> строчке вам необходимо объявить переменную container и иницилизовать ее значением "Ионная пушка".</p>';
	}
}
