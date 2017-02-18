'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../diagram.help');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Strings();

/**
 * Урок - 'Строки';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Strings() {

	return {
		title:              'Строки',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите в редакторе кода строку: <span class="red-label">Я есть BBot!</span></li>' +
							'<li>Для углубленного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Значения указываемые непосредственно в программном коде называются <strong>литералами</strong>.</li>' +
							'</ul>',
		character:          [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных');
				var type1 = block(400, 50, 'Объекты');
				var type2 = block(50, 50, 'Простые типы');

				var type21 = block(50, 135, 'Строки', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);

			}
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Рассмотрим простые типы более подробно:</p>' +
			'<p><span class="under-label"><strong>String</strong></span> - строка или последовательность из символов, используемая для представления текста в программе.</p>' +
			'<p>Строка заключается в парные одинарные или двойные кавычки, упоминаемые иногда как апострофы.</p>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Слава Роботам! BBot нашел строку! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>BBot не смог найти нужную строку!</p>' +
						  '<p>Он расстроен!</p>' +
						  '<p>А нет, шучу, у BBot\'а нет чувств!</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {
			return lessonResults.unknownError();
		}

		// Проверка строки
		return lessonResults.result(value === 'Я есть BBot!');

	}

}

// var typeMain = block(225, 50, 'Типы данных');
// var type1 = block(400, 50, 'Объекты');
// var type2 = block(50, 50, 'Простые типы');
//
// var type21 = block(50, 135, 'Строки', '#fe854f');
// var type22 = block(50, 220, 'Числа', '#fe854f');
// var type23 = block(50, 305, 'Логический тип', '#fe854f');
// var type24 = block(50, 390, 'null', '#fe854f');
// var type25 = block(50, 475, 'undefined', '#fe854f');
//
// var type11 = block(400, 135, 'Специальные', '#fe854f');
// var type12 = block(400, 220, 'Обычные', '#fe854f');
//
// graph.addCells([
// 	typeMain,
// 	type1,
// 	type2,
// 	type21,
// 	type22,
// 	type23,
// 	type24,
// 	type25,
// 	type11,
// 	type12
// ]);
//
// createLink(graph, typeMain, type1);
// createLink(graph, typeMain, type2);
// createLink(graph, type2, type21);
// createLink(graph, type21, type22);
// createLink(graph, type22, type23);
// createLink(graph, type23, type24);
// createLink(graph, type24, type25);
// createLink(graph, type1, type11);
// createLink(graph, type11, type12);
