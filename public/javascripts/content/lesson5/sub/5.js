'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Priorities();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Priorities() {

	return {
		isRestartDisabled:  true,
		title:              'Кто здесь главный?',
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
					['...', '...', '...'],
					['*', 'умножение', '14'],
					['/', 'деление', '14'],
					['+', 'сложение', '13'],
					['-', 'вычитание', '13'],
					['...', '...', '...'],
					['=', 'присваивание', '3'],
					['...', '...', '...']
				]
			}
		}]
	};

	function content() {

		return '<p>Каждый из операторов в <strong>JavaScript</strong>, имеет свой приоритет, ' +
			   'который определяет порядок их выполнения в выражении. Рассмотрим наглядный пример:</p>' +
			   '<pre>var e = 0.00028 + 2718 / 1000;</pre>' +
			   '<p>Как вы могли заметить в этом выражении используются три изученных нами оператора: <strong class="under-label">=</strong>, ' +
			   '<strong class="under-label">+</strong>, <strong class="under-label">/</strong>.' +
			   '<p> Оператор <strong class="under-label">/</strong> имеет более высокий приоритет, ' +
			   'поэтому выполняется в первую очередь.</p>' +
			   '<p> Оператор <strong class="under-label">=</strong> имеет более низкий приоритет. ' +
			   'Поэтому, сперва происходит вычисление всего выражения справа от оператора <strong class="under-label">=</strong>, ' +
			   'а затем полученный результат будет присвоен переменной.';

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

			correct: '<p>У кого самый высокий приоритет?</p>' +
					 '<p>BBot местный авторитет! Транслирую:</p>' +
					 '<p class="bbot-output">' + correctText + '</p>',

			unknownError: '<p>Ошибка! Ошибка! Ошиииибкааа!</p>'

		});

		if (correctText) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}
}
