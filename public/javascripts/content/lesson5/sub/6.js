'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorIncrement();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorIncrement() {

	return {
		isRestartDisabled:  true,
		title:              'Преуменьшая, увеличивай.',
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
				x1: 8,
				y2: Infinity
			}
		}, {
			audio: 'audio/lesson2/3-2',
			css: 'astromen-img',
			marker: {
				x1: 12,
				y2: Infinity
			}
		}]
	};

	function content() {

		return '<p>Часто пилоты-инженеры используют операцию изменения значения числовой переменной на ' +
			'<strong>1</strong>. В связи с этим, в языке программирования <strong>JavaScript</strong> существуют ' +
			'специальные операторы: <p> 1. Инкремент <strong class="under-label">++</strong> - увеличивает значение на ' +
			'<strong>1</strong>.<p> 2. Декремент <strong class="under-label">--</strong> - уменьшает значение на ' +
			'<strong>1</strong>. <p>Существуют две формы записи данных операторов: до переменной («префиксная» форма) ' +
			'и после переменной («постфиксная» форма). Разница между ними видна только в том случае, когда мы хотим ' +
			'использовать результат операции. Рассмотрим пример в редакторе кода.</p> Если оператор ' +
			'<strong class="under-label">++</strong> или <strong class="under-label">--</strong> стоит перед ' +
			'переменной, то сперва произойдет изменение переменной <strong>speed</strong>, а уже затем получившееся ' +
			'значение будет присвоено переменной <strong>result</strong>. Но, если оператор стоит после переменной ' +
			'<strong>speed</strong>, то сначала ее значение будет присвоено переменной <strong>result</strong>, ' +
			'а уже потом изменено на <strong>1</strong>.';

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

											  correct: '<p>Инкрементирую:</p>' +
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
