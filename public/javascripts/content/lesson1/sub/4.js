'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = WhatDoesBBotSay();

/**
 * Урок - 'What does BBot say?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function WhatDoesBBotSay() {

	return {
		title:              'What does BBot say?',
		content:            content,
		// Давайте рассмотрим пример как это работает
		// На второй строке команда BBotDebug будет выводить 'Это BBot!'
		// Запустите и увидите результат.
		// Что ж теперь попробуем вывести 'Всем привет!' на пятой строке
		instructions:       '<ul>' +
							'<li>Команда <span class="under-label">BBotDebug</span> на строке <strong>2</strong> выведет <span class="under-label">\'Это BBot!\'</span>.</li>' +
							'<li>Выведите текст <span class="under-label">\'Всем привет!\'</span> с помощью изученной команды.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Добавьте команду <span class="under-label-gray">BBotDebug(\'Всем привет!\');</span> на <strong>5</strong> строку.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson2/4-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/4-2.mp3',
			css:   'astromen-img',
			marker:      {
				x1: 2,
				y2: Infinity
			}
		}, {
			audio:       'audio/lesson2/4-3.mp3',
			css:         'astrogirl-img',
			waitForHint: true,
			marker:      {
				x1: 2,
				y2: Infinity
			}
		}, {
			audio:       'audio/lesson2/4-4.mp3',
			css:         'astrogirl-img',
			waitForHint: true,
			hint:        [{
				'click .enhoyhint-play': 'Запустите код и увидите результат',
				'nextButton':            false,
				'showSkip':              false
			}]
		}, {
			audio:  'audio/lesson2/4-5.mp3',
			css:    'astrogirl-img',
			marker: {
				x1: 5,
				y2: Infinity
			}
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
			'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать команду:</p>' +
			'<pre><strong>BBotDebug</strong>(\'то, что хотим сказать\');</pre>' +
			'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';

	}

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += e + '</br>';

				r = (e === 'Всем привет!');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Хах, я п0лучил нужные данные! Транслирую:</p>' +
					 '<p class="bbot-output">' + t + '</p>',

			text: t

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}
}
