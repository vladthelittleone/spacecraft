'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');

module.exports = JavaScript();

/**
 * Урок - 'JavaScript'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function JavaScript() {

	return {
		title:          'JavaScript',
		content:        content,
		// Справа показан пример управления транспортным кораблем с помощью JavaScript.
		// Функция run в бесконечном цикле последовательно раз за разом выполняет написанный код управления
		// в данном случае команду поворота налево.
		// Запустите код и увидите результат.
		instructions:   '<ul>' +
						'<li>Функция <span class="under-label">run</span> в бесконечном цикле последовательно раз за разом выполняет написанный код управления. Являтеся одной из самых важных функций SpaceCraft.</li>' +
						'<li>Больше информации о JavaScript: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Introduction">клац</a>.</li>' +
						'</ul>',
		character:      [{
			audio:  'audio/lesson2/2-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/2-2.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Пример управления транспортным кораблем',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}, {
			audio:  'audio/lesson2/2-3.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   6,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/2-4.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   9,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/2-5.mp3',
			css:    'astrogirl-img',
			waitForHint: true,
			hint:   [
				{
					'click .enhoyhint-play': 'Запустите код',
					'nextButton':             false,
					'showSkip':               false
				}
			]
		}],
		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate() {

		var botText = BBotText({
			correct: '<p>Кадет это функция run, функция run это кадет!</p>' +
					 '<p>Приятно познакомиться! </p>'
		});

		return botText.resultCorrect();

	}

	function content() {

		return '<p>Все космические корабли нашего флота управляются с помощью древней земной технологии - <strong>JavaScript</strong>.</p>' +
			'<p><strong>JavaScript</strong> - язык программирования, который был создан в 1995, за 31 год до колонизации Марса компанией EnoSam.</p>' +
			'<p>Основная задача академии заключается в освоении кадетами данного инструмента.</p>'

	}

}
