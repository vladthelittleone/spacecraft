'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorAssignment();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorAssignment () {

	return {
		isRestartDisabled: true,
		title: 'В присваивании нет ничего плохого',
		content: content,
		interpreterHandler: interpreterHandler,
		instructions: '<ul>' +
		'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
		'<i class="glyphicon glyphicon-play green"></i>.</li>' +
		'<li>Еще о присваивании: ' +
		'<a target="_blank" href="https://msdn.microsoft.com/ru-ru/library/1w2h1k9x(v=vs.94).aspx">клац</a>.</li>' +
		'</ul>',
		character: [{
			audio: 'audio/lesson2/3-2',
			css: 'astromen-img',
			marker: {
				x1: 3,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson2/3-2',
			css: 'astromen-img',
			marker: {
				x1: 7,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson2/3-2',
			css: 'astromen-img',
			marker: {
				x1: 11,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson2/3-2',
			css: 'astromen-img',
			marker: {
				x1: 14,
				y2: Infinity
			}
		}]
	};

	function content () {

		return '<p> В прошлых уроках вы уже сталкивались с оператором присваивания <span class="under-label">=</span>.' +
			'<p>С его помощью переменной задают значение. Например, вот таким образом вы можете создать переменную ' +
			'содержащую ответ на все вопросы.' +
			'<pre>var allQuestionsAnswered = 42;</pre> ' +
			'Переменной будет присвоено значение <class="under-label">42</span>. ' +
			'<p>Помимо этого, одной переменной, можно присвоить значение другой переменной. Например.' +
			'<pre>everythingAnswer = allQuestionsAnswered;</pre>' +
			'В результате чего переменной <span class="under-label">everythingAnswer</span> будет присвоено значение 42. ' +
			'Также, любой переменной можно присвоить результат выполнения выражения. Например, вот таким образом.' +
			'<pre>everythingAnswer = 10 *  allQuestionsAnswered / 2 - 1</pre>' +
			'В результате переменной <span class="under-label">everythingAnswer</span> будет присвоено значение 209.' +
			'<p>В программировании, строки кода выполняются слева направо. ' +
			'Однако, в случае с оператором <span class="under-label">=</span>, сперва будет вычислено выражение справа от оператора ' +
			'и только после этого результат вычисления будет присвоен переменной.</p>' +
			'<p>Вы знаете почему так происходит?</p>';

	}

	function interpreterHandler (value) {

		var correctText;

		if (value) {

			correctText = '<p>Присваивание это немного скучно, пока присваивание не начинает выполнять BBot.</p>' +
				'<p>Транслирую:</p>';

			value.forEach(function (v) {

				if (v) {

					correctText += '<p class="bbot-output">' + v + '</p>';

				}

			});

		}

		var lessonResults = LessonResults({
											  correct: correctText,
											  unknownError: '<p>Тададам! И вновь 0шибка!</p>'
										  });

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}
