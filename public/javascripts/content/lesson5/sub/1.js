'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorsAndOperands();

function OperatorsAndOperands () {

	return {
		isRestartDisabled: true,
		title: 'Нужно бооольше операторов!',
		content: content,
		interpreterHandler: interpreterHandler,
		instructions: '<ul>' +
		'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
		'<li>Больше информации об операндах <strong>JavaScript</strong>: <a target="_blank" href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Операторы">клац</a>.</li>' +
		'</ul>'
	};

	function content () {

		return '<p>Вольно кадет, продолжим занятия.' +
			'<p>Сегодня мы поговорим об операторах и операндах.' +
			'<p>В предыдущих уроках вы уже сталкивались с операторами языка JavaScript: ' +
			'<span class="under-label"><strong>+</strong></span>,' +
			'<span class="under-label"><strong>=</strong></span>,' +
			'<span class="under-label"><strong>></strong></span>. ' +
			'К операнду в свою очередь применяются операторы. Например:' +
			'<p><pre>' +
			'// Оператор сложения: +.\n' +
			'// Операнд: число 5, число 4.\n' +
			'<strong>5</strong> + <strong>4</strong>' +
			'</pre>' +
			'<p>Оператор может быть применен к одному операнду - <strong>унарный оператор</strong> ' +
			'или к двум - <strong>бинарный оператор</strong>.';

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
