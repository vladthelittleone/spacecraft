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
		instructions: '<ul>' +
					  '<li>Функция <span class="under-label">run</span> в бесконечном цикле последовательно раз за разом выполняет написанный код управления. Являтеся одной из самых важных функций SpaceCraft.</li>' +
					  '<li>Больше информации о JavaScript: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Introduction">клац</a>.</li>' +
					  '</ul>',
		character:    [{
			audio:  'audio/lesson2/2-1.mp3',
			css:    'astromen-img',
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
