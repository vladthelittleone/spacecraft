'use strict';

let LessonResults = require('../../lesson-results');

module.exports = OperatorPlus();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorPlus() {

	return {
		isRestartDisabled:  true,
		title:              'Познай дзен и конкатенацию',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
							'<i class="glyphicon glyphicon-play green"></i>.</li>' +
							'<li>Хочешь узнать больше? Лови: ' +
							'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/A_re-introduction_to_JavaScript#Операторы">клац</a>.</li>' +
							'</ul>',
		character:    [{
			audio: 'audio/lesson6/3-1',
			css:   'astromen-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			audio: 'audio/lesson6/3-2',
			css:   'astromen-img',
			marker: {
				x1:   5,
				y2:   Infinity
			}
		}, {
			audio: 'audio/lesson6/3-3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson6/3-4',
			css:   'astromen-img',
			marker: {
				x1:   8,
				x2:   8,
				y1:   10,
				y2:   20,
				type: 'line'
			}
		}, {
			audio: 'audio/lesson6/3-5',
			css:   'astromen-img',
			marker: {
				x1:   8,
				x2:   8,
				y1:   23,
				y2:   26,
				type: 'line'
			}
		}]
	};

	function content() {

		return '<p>Кадет, из уроков математики вы знаете, ' +
			   'что <strong class="under-label">+</strong> используется для сложения чисел. ' +
			   'В <strong>JavaScript</strong> оператор <strong class="under-label">+</strong> ' +
			   'можно также использовать для объединения строк.</p>' +
			   '<p>Такая операция называется <strong>конкатенацией</strong>.</p>' +
			   '<p>Важной особенностью конкатенации является то, что если один из операндов строка, ' +
			   'то второй будет приведен к этому же типу.</p>';

	}

	function interpreterHandler(value) {

		let lessonResults = {
			correct:      '<p>Плюсую-транслирую:</p>' +
						  '<p class="bbot-output">{{correctText}}</p>',
			unknownError: '<p>Тададам! И вновь 0шибка!</p>'
		};

		return LessonResults(lessonResults).resultsWrapper(value);
	}
}
