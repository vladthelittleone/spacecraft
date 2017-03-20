'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = cargoTurret();


function cargoTurret() {

	return {
		title:        'Замена оружия',
		character:    [{
			// Вы добрались до места назначения. Приступайте к разгрузке.
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			// Значение одной переменной-контейнера моно передавать другой перемнной.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		},{
			// Вам неообходимо в грузовой отсек турели помеситить контейнер с корабля.
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		},
			{
				// Произведите погрузку измененного контейнера на корабль
				// Для получения более точной информацией воспользуйтесь инструкцией
				audio:  'audio/lesson2/1-1.mp3',
				css:    'astromen-img',
				marker: {
					x1:   20,
					y2:   Infinity
				}
			}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
		'<li><span class="under-label">var container1 = "Пусто";</span></li>' +
		'<li><span class="under-label">var container2 = "Галактический червь";</span></li>' +
		'<li>Значение одной перемнной можно скопировать(перенести) в другую переменную :</li>' +
		'<li><span class="under-label">container1 = container2;</span></li>' +
		'<li>В container1 теперь находится "Галактический червь"</li>' +
		'<li><span class="under-label">transport.getFromCargo();</span> - функция корабля</li>' +
		'<li>С помощью данной функции можно получить значение переменной в хранилище корабля.</li>' +
		'<li><span class="under-label">transport.setToCargo(container);</span> - функция корабля</li>' +
		'<li>С помощью данной функции можно получить положить новое значение(контейнер) в хранилище корабля.</li>' +
		'</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Этот хлам и есть плазменная пушка?</p>'
		});

		if (spaceCraft.getFromCargo() === 'Сломанное оружие') {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>А теперь нужно немножко пошевелить извлинами кадет.</p>' +
			   '<p>Вам необходимо сначало погрузить оружие из турели в контейнер корабля.</p>' +
			   '<p>Затем этот контейнер погрузить на корабль.</p>';
	}
}
