'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorIncrement();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorIncrement() {

	return {
		isRestartDisabled:  true,
		title:              'Преуменьшая увеличивай',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
							'<i class="glyphicon glyphicon-play green"></i>.</li>' +
							'<li>Инкрементируй свои знания: ' +
							'<a target="_blank" href="https://msdn.microsoft.com/ru-ru/library/26k41698(v=vs.94).aspx">клац</a>.</li>' +
							'</ul>',
		character:          [{
			audio:  'audio/lesson2/3-2',
			css:    'astromen-img',
			marker: {
				x1: 3,
				y2: Infinity
			}
		}]
	};

	function content() {

		return '<p>Очень часто, в программировании, возникает необходимость увеличивать или уменьшать значение ' +
			'числовой переменной на 1. Поэтому, в языке программирования JavaScript существуют специальные ' +
			'операторы <span class="under-label">++</span>(инкремент), для увеличения значения на 1 и ' +
			'<span class="under-label">--</span>(декремент), для уменьшения значения на 1.</p>' +
			'<p>Существуют две формы записи данных операторов: до переменной и после переменной. Обе формы выполняют ' +
			'одно и тоже, изменяют значение переменной на 1. Однако если в выражении участвуют другие операторы, то ' +
			'разница существует. Рассмотрим пример в редакторе кода.</p> <pre>a = ++i;</pre>' +
			'<p>Если оператор <span class="under-label">++</span>(или <span class="under-label">--</span>) ' +
			'стоит перед переменной, то сперва произойдет изменение переменной <strong>i</strong>, а уже ' +
			'затем получившиеся значение будет присвоено переменной <strong>а</strong>.</p> <pre>b = j++;</pre>' +
			'И наоборот, если оператор стоит после переменной <strong>i</strong>, то вначале ее значение будет ' +
			'присвоено переменной <strong>а</strong>, а уже потом изменено на 1.';

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
