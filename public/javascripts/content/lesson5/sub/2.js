'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorPlus();

function OperatorPlus () {

	return {
		isRestartDisabled: true,
		title: 'Познай дзен и конкатенацию.',
		content: content,
		interpreterHandler: interpreterHandler,
		instructions: '<ul>' +
		'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
		'<i class="glyphicon glyphicon-play green"></i>.</li>' +
		'<li>Больше информации об операторах <strong>JavaScript</strong>: ' +
		'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Операторы">клац</a>.</li>' +
		'</ul>',
		character: [
			{
				audio: 'audio/lesson2/3-2',
				marker: {
					x1: 2,
					y2: Infinity
				}
			}, {
				audio: 'audio/lesson2/3-3',
				marker: {
					x1: 5,
					y2: Infinity
				}
			}, {
				audio: 'audio/lesson2/3-3',
				marker: {
					x1: 8,
					y2: Infinity
				}
			}, {
				audio: 'audio/lesson2/3-3',
				marker: {
					x1: 11,
					y2: Infinity
				}
			}],
	};

	function content () {

		return '<p>Поговорим об операторе <span class="under-label">+</span>' +
			'<p>Из уроков математики, вы знаете что <span class="under-label">+</span> используется для сложения чисел. ' +
			'Но если оператор <span class="under-label">+</span> использовать со строками, то он объединит их. ' +
			'Такая операция называется конкатенацией. ' +
			'<p>Важной особенностью объединения строк является то, что если один из операторов строка, ' +
			'то второй тоже будет приведен к строке.';

	}

	function interpreterHandler (value) {

		var correctText;

		if (value) {

			correctText = '<p>Транслирую:</p>';

			value.forEach(function (v) {

				if (v) {

					correctText += '<p class="bbot-output">' + v + '</p>';

				}

			});

		}

		var lessonResults = LessonResults({
											  correct: correctText,
											  unknownError: '<p>Упс! Неизвестная ошибка!</p>' +
											  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'
										  });

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}
