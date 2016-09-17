'use strict';

var joint = require('jointjs');

module.exports = AcademyProgram();

/**
 * Урок - 'Программа академии';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function AcademyProgram() {

	return {
		title:        'Много, много типов',
		defaultBBot:  defaultBBot,
		content:      content,
		// Что ж кадет, в связи с захватом корабля, нам пришлось отойти от программы.
		// Прошу вас держать всю информацию, которой вы обладаете, в тайне.
		// Сейчас проводится расследование данного инцидента и
		// пока неизвестно кто подменил исходный код транспортного корабля.
		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>',
		character:    [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных');
				var type1 = block(400, 50, 'Объекты');
				var type2 = block(50, 50, 'Простые типы');

				var type21 = block(50, 135, 'Числа', '#fe854f');
				var type22 = block(50, 220, 'Строки', '#fe854f');
				var type23 = block(50, 305, 'Логический тип', '#fe854f');
				var type24 = block(50, 390, 'null', '#fe854f');
				var type25 = block(50, 475, 'undefined', '#fe854f');

				var type11 = block(400, 135, 'Специальные', '#fe854f');
				var type12 = block(400, 220, 'Обычные', '#fe854f');

				graph.addCells([
					typeMain,
					type1,
					type2,
					type21,
					type22,
					type23,
					type24,
					type25,
					type11,
					type12
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);
				createLink(graph, type2, type21);
				createLink(graph, type21, type22);
				createLink(graph, type22, type23);
				createLink(graph, type23, type24);
				createLink(graph, type24, type25);
				createLink(graph, type1, type11);
				createLink(graph, type11, type12);

			}
		}, {
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img'
		}]
	};

	function content() {

		return '<p>Итак, сегодня мы кратко познакомимся с типами данных языка программирования JavaScript.</p>' +
			'<p>Стандарт JavaScript определяет две категории типов данных: объекты и простые типы.</p>';

	}

	function defaultBBot() {

		return '<p>Простые типы нам уже частично знакомы - это текстовая строка и число.</p>'

	}

	function createLink(graph, elm1, elm2) {

		var erd = joint.shapes.erd;

		var myLink = new erd.Line({
			source: {id: elm1.id},
			target: {id: elm2.id}
		});

		myLink.attr({
			'.connection':    {stroke: '#fff', 'stroke-width': 4},
			'.marker-target': {stroke: '#fff', fill: '#fff', d: 'M 10 0 L 0 5 L 10 10 z'}
		});

		return myLink.addTo(graph);

	}

	function block(x, y, text, color) {

		var erd = joint.shapes.erd;

		return new erd.Entity({
			position: {x: x, y: y},
			attrs:    {
				text:             {
					fill:             '#ffffff',
					text:             text,
					'letter-spacing': 0
				},
				'.outer, .inner': {
					fill:   color || '#152B39',
					stroke: 'none'
				}
			}
		});

	}
}
