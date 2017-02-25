'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = loadingStock();

function loadingStock() {

	return {
		title:        'Разгрузка на складе',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
			marker: {
				x1:   13,
				y2:   Infinity
			}
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
		'<li><span class="under-label">transport.setToCargo(container);</span> - функция корабля</li>' +
		'<li>С помощью данной функции можно получить положить новое значение(контейнер) в хранилище корабля.</li>' +
		'<li>Значение одной перемнной можно скопировать(перенести) в другую переменную :</li>' +
		'<li><span class="under-label">container1 = container2;</span></li>' +
		'<li>Положите в контейнер склада, значение переменной, которое храниться у вас на корабле.</li>' +
		'</ul>'
	};

	function interpreterHandler(v) {

		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				r = (e === 'containerStock = transport.getFromCargo()') ||
					(e === 'containerStock=transport.getFromCargo()') ||
					(e === 'containerStock= transport.getFromCargo()') ||
					(e === 'containerStock =transport.getFromCargo()');

			});

		}

		var lessonResults = LessonResults({
			correct: '<p>Хмм, беру свои слова назад, это не просто.</p>' +
			'<p>Пойду возьму себе машинного масла/</p>'
		});

		if (r) {

			return lessonResults.resultCorrect();

		}
	}

	function content() {

		return '<p>Тут какой-то контент!</p>';

	}
}
