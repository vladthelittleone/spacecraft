'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var DiagramHelp = require('../diagram.help');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Booleans();

/**
 * Урок - 'Логический тип';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Booleans() {

	return {
		title:              'Истина, ложь, ложь…',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Введите логическое выражение, при котором система должна вернуть <span class="red-label">true</span>.</li>' +
							'<li>Для любознательных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Булев_тип_null_и_undefined">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Введите выражение <span class="under-label-gray">2 > 1</span> на <strong>7</strong> строке.</li>' +
							'</ul>',
		character:          [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных');
				var type1 = block(400, 50, 'Объекты');
				var type2 = block(50, 50, 'Простые типы');

				var type21 = block(50, 135, 'Строки', '#fe854f');
				var type22 = block(50, 220, 'Числа', '#fe854f');
				var type23 = block(50, 305, 'Логический тип', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22,
					type23
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);
				createLink(graph, type21, type22);
				createLink(graph, type22, type23);
			}
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Космос суров, здесь полно лжи. Никому не верьте! Любое высказывание, даже близких, необходимо проверять на правдивость!</p>' +
			'<p>Единственный, кто вас никогда не подведет - ваш корабль.</p>' +
			'<p><span class="under-label"><strong>Boolean</strong></span> - это логический тип данных, который может принимать значения <span class="under-label">true</span>, либо <span class="under-label">false</span>, как вы уже наверно догадались «истина», «ложь» соответственно.' +
			'<p>Например, сравнение двух чисел может вернуть либо <span class="under-label-gray">true</span>, либо <span class="under-label-gray">false</span>:</p>' +
			'<pre>5 > 4 - <strong>true</strong></pre>' +
			'<pre>4 > 5 - <strong>false</strong></pre>'
	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>В каждой шутке естb доля шутки! Транслирую:</p>' +
					 '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>Истина не найдена! Где же она?</p>' +
						  '<p>Пох0же вы не разобрались с логическим типом.</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		// Проверка на true
		return lessonResults.result(value);

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
