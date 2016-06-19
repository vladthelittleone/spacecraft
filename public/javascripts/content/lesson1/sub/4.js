'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');

module.exports = WhatDoesBBotSay();

/**
 * Урок - 'What does BBot say?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function WhatDoesBBotSay() {

	return {
		title:        'What does BBot say?',
		content:      function () {

			return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
				'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать команду:</p>' +
				'<pre>BBotDebug(\'то, что хотим сказать\');</pre>' +
				'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';

		},
		// Давайте рассмотрим пример как это работает
		// На второй строке команда BBotDebug будет выводить 'Это BBot!'
		// Запустите и увидите результат.
		// Что ж теперь попробуем вывести 'Всем привет!' на пятой строке
		instructions: '<ul>' +
					  '<li>Команда <span class="under-label">BBotDebug</span> на строке <strong>2</strong> выведет <span class="under-label">\'Это BBot!\'</span>.</li>' +
					  '<li>Выведите текст <span class="under-label">\'Всем привет!\'</span> с помощью изученной команды.</li>' +
					  '</ul>',
		hint:         '<ul>' +
					  '<li>Добавьте команду <span class="under-label-gray">BBotDebug(\'Всем привет!\');</span> на <strong>5</strong> строку.</li>' +
					  '</ul>',
		character:    [{
			audio:  'audio/lesson1/3.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Редактор кода',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			],
			marker: {
				x1:   6,
				y2:   Infinity,
				type: 'line'
			}
		}],
		interpreterHandler:  function (v) {

			var t = '';
			var r = false;

			if (v && v.forEach)
			{
				v.forEach(function (e) {

					t += e + '</br>';

					r = (e === 'Всем привет!');

				});
			}

			var botText = BBotText({

				correct: '<p>Хах, я п0лучил нужные данные! Транслирую:</p>' +
						 '<p class="bbot-output">' + t + '</p>',

				text: t

			});

			if (r) {

				return botText.resultCorrect();

			}

			return botText.text();
		}
	};
}
