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

	var typeMain = block(225, 50, 'Типы данных');
	var type1 = block(400, 50, 'Объекты');
	var type2 = block(50, 50, 'Простые типы');

	var type21 = block(50, 135, 'Строки', '#fe854f');
	var type22 = block(50, 220, 'Числа', '#fe854f');

	return {
		title:             'Много, много типов',
		defaultBBot:       defaultBBot,
		content:           content,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Нажмите "Далее" для продолжения.</li>' +
						   '<li>Больше информации о типах данных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures">клац</a>.</li>' +
						   '</ul>',
		character:         [{
			audio: 'audio/lesson3/3-1',
			css:   'astromen-img'
		}, {
			audio:       'audio/lesson3/3-2',
			css:         'astromen-img',
			waitForHint: true,
			diagram:     function (graph) {

				graph.addCells([
					typeMain
				]);

			},
			hint:        [
				{
					'next .content-overflow .diagram-board': 'Категории типов данных',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			]
		}, {
			audio:       'audio/lesson3/3-3',
			css:         'astromen-img'
		}, {
			audio:   'audio/lesson3/3-4',
			css:     'astromen-img',
			diagram:     function (graph) {

				graph.addCells([
					type1
				]);

				createLink(graph, typeMain, type1);

			}
		}, {
			audio: 'audio/lesson3/3-5',
			css:   'astromen-img',
			diagram: function (graph) {

				graph.addCells([
					type2
				]);

				createLink(graph, typeMain, type2);
			}
		}, {
			audio:   'audio/lesson3/3-6',
			css:     'astromen-img',
			diagram: function (graph) {

				graph.addCells([
					type21,
					type22
				]);

				createLink(graph, type2, type21);
				createLink(graph, type21, type22);
			},
			marker:  {
				x1: 5,
				y2: Infinity
			}
		}, {
			audio:   'audio/lesson3/3-7',
			css:     'astromen-img',
			marker:  {
				x1: 8,
				y2: Infinity
			}
		}]
	};

	function defaultBBot() {

		return '<p>Взломатb можно все, особенно если это придумано человеком.</p>' +
			'<p>Даже BBot\'а! Вот отст0й.</p>'

	}

	function content() {

		return '<p>Сканер обнаружил датчик. Сейчас мы проведем анализ его систем и попробуем получить необходимые данные.</p>' +
			'<p>Пока происходит взлом, кратко ознакомимся с типами данных.</p>' +
			'<p><strong>JavaScript</strong> определяет две категории типов данных: <span class="under-label">объекты</span> и <span class="under-label">простые типы</span>.</p>' +
			'<p>Простые типы нам уже частично знакомы - это строка и число.</p>';
		// Справа вы можете увидеть диаграмму, которая описывает основные категории типов данных
	}

}
