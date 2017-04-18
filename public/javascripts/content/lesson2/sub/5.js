'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../../diagram.help.js');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Numbers();

/**
 * Урок - 'Числа';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Numbers() {

	return {
		title:              'Миром правят цифры!',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите в редакторе число: <span class="red-label">1984</span>.</li>' +
							'<li>Больше информации о числах: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Числа">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Введите число <span class="under-label-gray">1984</span> на <strong>22</strong> строке.</li>' +
							'</ul>',
		character:          [{
			audio:   'audio/lesson3/5-1',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных', '#152B39');
				var type1 = block(400, 50, 'Объекты', '#152B39');
				var type2 = block(50, 50, 'Простые типы', '#152B39');

				var type21 = block(50, 135, 'Строки', '#fe854f');
				var type22 = block(50, 220, 'Числа', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);
				createLink(graph, type21, type22);
			}
		}, {
			audio:  'audio/lesson3/5-2',
			css:    'astromen-img',
			marker: {
				x1: 5,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-3',
			css:    'astromen-img',
			marker: {
				x1: 8,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-4',
			css:    'astromen-img',
			marker: {
				x1: 11,
				y2: Infinity
			},
		}, {
			audio:  'audio/lesson3/5-5',
			css:    'astromen-img',
			marker: {
				x1: 15,
				y2: Infinity
			}
		}, {
			audio:  'audio/lesson3/5-6',
			css:    'astromen-img',
			marker: {
				x1: 19,
				y2: Infinity
			},
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p><span class="under-label"><strong>Number</strong></span> - числа, с помощью которых ваш корабль будет выполнять основные вычисления. Заметим, что числа пишутся без кавычек.</p>' +
			'<p>В <strong>JavaScript</strong> нет различий между целыми и вещественными значениями.</p>' +
			'<p>Шестнадцатиричные начинаются с префикса <span class="under-label"><strong>0x</strong></span>.</p>' +
			'<p>При делении на ноль, <strong>JavaScript</strong> выдаст специальное числовое значение - <span class="under-label"><strong>Infinity</strong></span>,' +
			'а не новую черную дыру, как вы могли подумать.</p>' +
			'<p>Другое специальное числовое значение - <span class="under-label"><strong>NaN</strong></span>, возвращается при ошибках в математических вычислениях.</p>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Всё сущее естb числ0! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>4 8 15 16 23 42...</p>' +
						  '<p>Ответ на вопрос недопустим!</p>' +
						  '<p>Побробуйте ввести более короткое число, допустим 451.</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		// Проверка числа
		return lessonResults.result(value === 1984 || value === 451);

	}

}
