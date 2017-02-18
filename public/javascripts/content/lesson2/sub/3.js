'use strict';

var DiagramHelp = require('../diagram.help');

var block = DiagramHelp.block;
var createLink = DiagramHelp.createLink;

module.exports = Sensor();

/**
 * Урок - 'Взлом датчика';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Sensor() {

	return {
		title:        'Датчик',
		defaultBBot:  defaultBBot,
		content:      content,
		isRestartDisabled: true,
		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '<li>Больше информации о типах данных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures">клац</a>.</li>' +
					  '</ul>',
		character:    [{
			audio:   'audio/lesson2/1-1.mp3',
			css:     'astromen-img',
			diagram: function (graph) {

				var typeMain = block(225, 50, 'Типы данных');
				var type1 = block(400, 50, 'Объекты');
				var type2 = block(50, 50, 'Простые типы');

				graph.addCells([
					typeMain,
					type1,
					type2
				]);

				createLink(graph, typeMain, type1);
				createLink(graph, typeMain, type2);

			}
		}]
	};

	function defaultBBot() {

		return '<p>Взломатb можно все, особенно если это придумано человеком.</p>' +
			   '<p>Даже BBot\'а! Вот отст0й.</p>'

	}

	function content() {

		return '<p>Сканер обнаружил датчик.</p>' +
			'<p>Пока происходит взлом, кратко познакомимся с типами данных языка программирования.</p>' +
			'<p><strong>JavaScript</strong> определяет две категории типов данных: <span class="under-label">объекты</span> и <span class="under-label">простые типы</span>.</p>' +
			'<p>Простые типы нам уже частично знакомы - это строка и число.</p>';
			// Справа вы можете увидеть диаграмму, которая описывает основные категории типов данных
	}

}
