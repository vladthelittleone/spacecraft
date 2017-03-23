'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = loadingStock();

function loadingStock() {

	return {
		isRestartDisabled: true,
		title:        'Полет к исследовательскому центру',
		character:    [{
			// Пора разобраться откуда растут ноги этой деверсии. Приступайте к рахгрузке
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			// Переместите контейнер с корабля в один из контейноров склада.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		},{
			// В данной строчке кода вам необходимо воспользоваться функцией грузового корабля etFromCargo()
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
		'<li><span class="under-label">transport.getToCargo(container);</span> - функция корабля</li>' +
		'<li>С помощью данной функции можно положить новое значение(контейнер) в хранилище корабля.</li>' +
		'<li>Значение одной перемнной можно скопировать(перенести) в другую переменную :</li>' +
		'<li><span class="under-label">container1 = container2;</span></li>' +
		'<li>Положите в контейнер склада, значение переменной, которое храниться у вас на корабле.</li>' +
		'</ul>'
	};

	function interpreterHandler(v) {

		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				r = (e === 'containerStock');

			});

		}

		var lessonResults = LessonResults({
			correct: '<p>Хмм, беру свои слова назад, это не просто.</p>' +
					 '<p>Пойду возьму себе машинного масла, мои шестеренки ' +
					 'изрядно подгорели, надос смазать.</p>',

			text: '<p>Похоже что-то пошло не так, проверьте программу.</p>'
		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Пора понять в чем дело. Повместите контейнер с корабля в конйтенер склада. </p>';

	}
}
