'use strict';

var DiagramHelp = require('../../diagram.help');

var block = DiagramHelp.blockWithAdvancedSettings;

module.exports = FirstContactWithVariables();

/**
 * Created by vaimer on 31.01.17.
 */
function FirstContactWithVariables() {

	return {
		isRestartDisabled: true,
		title:        'Где все хранить?',
		character:    [{

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astromen-img',
			diagram: function (graph) {

				var variables = block(225, 50, 200, 150, 'container1', '#0a151c', '#b8bfc3', '#152b39');
				var value = block(275, 150, 100, 50, '', '#152b39', '#b8bfc3', '#152b39');

				variables.embed(value);

				graph.addCells([
					variables,
					value
				]);
			}
		}, {

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'

		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '<li>Узнать больше о ключевом слове <strong>var</strong>: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/var">клик</a>.</li>' +
					  '</ul>'
	};

	function content() {

		return '<p>Рад снова вас видеть, кадет. Вам необходимо перевести датчик в исследовательский центр. ' +
			'Чтобы выполнить задание, вам потребуется изучить некоторые возможности работы с информацией. Приступим.</p>' +
			'<p>Для хранения данных в <strong>JavaScript</strong> используются переменные. ' +
			'Что это такое? По сути это именованные контейнеры, которые хранят различные значения.</p>' +
			'<p>Переменные объявляются, другими словами, создаются с помощью ключевого слова <strong class="under-label">var</strong>. ' +
			'После следует имя переменной, которое может состоять из букв, цифр, символов <strong>$</strong> и <strong>_</strong> , ' +
			'но не должно начинаться с цифры.</p>';

	}

	function defaultBBot() {

		return '<p>Проснись, кадет...</p>';

	}
}
