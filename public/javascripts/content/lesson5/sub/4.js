'use strict';

let LessonResults = require('../../lesson-results');

module.exports = OperatorAssignment();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorAssignment() {

	return {
		isRestartDisabled:  true,
		title:              'В присваивании нет ничего плохого',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
							'<i class="glyphicon glyphicon-play green"></i>.</li>' +
							'<li>Присвой себе больше знаний: ' +
							'<a target="_blank" href="https://msdn.microsoft.com/ru-ru/library/1w2h1k9x(v=vs.94).aspx">клац</a>.</li>' +
							'</ul>',
		character:          [{
			audio:  'audio/lesson6/4-1',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson6/4-2',
			css:    'astromen-img',
			marker: {
				x1: 3,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson6/4-3',
			css:    'astromen-img',
			marker: {
				x1:   7,
				x2:   7,
				y1:   4,
				y2:   8,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson6/4-4',
			css:    'astromen-img',
			hint:   [{
				'next .ace_scroller': 'Присвоим результат выполнения выражения переменной',
				'nextButton':         {text: 'Далее'},
				'showSkip':           false
			}],
			waitForHint: true,
			marker: {
				x1:   7,
				x2:   7,
				y1:   32,
				y2:   33,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson6/4-5',
			css:    'astromen-img',
			marker: {
				x1:   7,
				x2:   7,
				y1:   15,
				y2:   16,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson6/4-6',
			css:    'astromen-img',
			marker: {
				x1:   7,
				x2:   7,
				y1:   9,
				y2:   10,
				type: 'line'
			}
		}, {
			audio:  'audio/lesson6/4-7',
			css:    'astromen-img'
		}]
	};

	function content() {

		return '<p>Рассмотрим оператор присваивания более подробно.' +
			   '<p>Напомним, что с  его помощью переменной задают значение. Например, вы можете создать переменную, ' +
			   'содержащую ответ на «Главный вопрос жизни, вселенной и всего такого»:</p>' +
			   '<pre><strong>var</strong> ultimateAnswer = 42;</pre>' +
			   '<p>Любой переменной можно присвоить результат выполнения выражения. Например:</p>' +
			   '<pre><strong>var</strong> solo = 301 + ultimateAnswer / 2;</pre>' +
			   '<p>В результате переменной <span class="under-label">solo</span> будет присвоено значение <strong>322</strong>. ' +
			   'Заметим, что сперва будет выполнено <strong>деление</strong>, затем <strong>сложение</strong> ' +
			   'и только после этого, результат вычисления будет <strong>присвоен</strong> переменной.</p>' +
			   '<p>Догадываетесь почему так происходит?</p>';

	}

	function interpreterHandler(value) {

		let lessonResults = {

			correct: '<p>Solo Yolo:</p>' +
					 '<p class="bbot-output">{{correctText}}</p>',

			unknownError: '<p>И это была твоя последняя ошибка!</p>' +
						  '<p>Ладно, предпоследняя!</p>'

		};

		return LessonResults(lessonResults).resultsWrapper(value);
	}
}
