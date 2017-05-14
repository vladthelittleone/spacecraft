'use strict';

var LessonResults = require('../../lesson-results');

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
		character:          [
			{
				audio:  'audio/lesson2/3-2',
				marker: {
					x1: 2,
					y2: Infinity
				}
			}, {
				audio:  'audio/lesson2/3-3',
				marker: {
					x1: 5,
					y2: Infinity
				}
			}, {
				audio:  'audio/lesson2/3-3',
				marker: {
					x1: 8,
					y2: Infinity
				}
			}, {
				audio:  'audio/lesson2/3-3',
				marker: {
					x1: 11,
					y2: Infinity
				}
			}]
	};

	function content() {

		return '<p>Кадет, из уроков математики вы знаете, что <strong class="under-label">+</strong> используется для сложения чисел. ' +
			'В <strong>JavaScript</strong> оператор <strong class="under-label">+</strong> можно также использовать для объединения строк.</p>' +
			'<p>Такая операция называется <strong>конкатенацией</strong>.</p>' +
			'<p>Важной особенностью конкатенации является то, что если один из операндов строка, ' +
			'то второй тоже будет приведен к строке.</p>';

	}

	function interpreterHandler(value) {

		var correctText;

		if (value) {

			correctText = '';

			value.forEach(function (v) {

				if (v) {

					correctText += v + '<br>';

				}

			});

		}

		var lessonResults = LessonResults({
			correct:      '<p>Плюсую-транслирую:</p>' +
						  '<p class="bbot-output">' + correctText + '</p>',
			unknownError: '<p>Тададам! И вновь 0шибка!</p>'
		});

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}
