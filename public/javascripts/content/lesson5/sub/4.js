'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Priorities();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Priorities() {

	return {
		isRestartDisabled:  true,
		title:              'Кто здесь первый?',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
							'<i class="glyphicon glyphicon-play green"></i>.</li>' +
							'</ul>',
		character:          [{
			audio:  'audio/lesson2/3-2',
			css:    'astromen-img',
			marker: {
				x1: 3,
				y2: Infinity
			},
			lessonTable: {
				columns: ['Обозначение', 'Наименование', 'Приоритет'],
				rows: [
					['*', 'умножение', '14'],
					['/', 'деление', '14'],
					['+', 'сложение', '13'],
					['=', 'присваивание', '3']
				]
			}
		}]
	};

	function content() {

		return '<p>Каждый из операторов в JavaScript, так же как и в математике, имеет свой приоритет, ' +
			'Приоритет определяет порядок выполнения операторов в выражении. Рассмотрим выражение в редакторе кода.</p>' +
			'<pre>a = 10 + 12 * 3 / 2;</pre>' +
			'<p>В данном выражении используют четыре оператора: <span class="under-label">=, +, *, /</span>.' +
			'<p> Операторы <span class="under-label">*</span> и ' +
			'<span class="under-label">/</span> имеют самый высокий приоритет, ' +
			'поэтому они выполняються в первую очередь. Слева направо. </p>' +
			'<p> Оператор <span class="under-label">=</span> имеет самый низкий приоритет. ' +
			'Поэтому, сперва происходит вычисление всего выражения справа от оператора, ' +
			'а уже затем, полученный результат будет присвоен переменной, как результат работы оператора.' +
			'Узнать больше о приоритетах операторов можно ' +
			'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence">здесь</a>.</li>';

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

			correct: '<p>Solo Yolo:</p>' +
					 '<p class="bbot-output">' + correctText + '</p>',

			unknownError: '<p>И это была твоя последняя ошибка!</p>' +
						  '<p>Ладно, предпоследняя!</p>'

		});

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}
