'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 24.03.17.
 */

module.exports = goToResearchCenter();

function goToResearchCenter() {

	return {
		isRestartDisabled: true,
		title:        'Пора исследовать',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  	'<li>На 14 строчке необходимо скопировать значения из грузовго отсека в переменную <span class="red-label">researchCenterContainer</span>.</li>' +
						'<li>Для получения значения, хранящегося в грузовом отсека кораблся воспользуйтесь функцией <span class="red-label">.getFromCargo()</span>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += e + '</br>';
				r = (e === 'Вражеский датчик');

			});

		}

		var lessonResults = LessonResults({
			correct: '<p>Подтверждаю выгрузку.</p>' +
					 '<p>Иссуледовательский центр '+ t +' получено</p>',

			text: '<p>Похоже что-то пошло не так, проверьте программу.</p>'
		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return  '<p>Перед вами кадет наш исследовательский центр. Все самые передовые разработки идут именно отсюда.</p>' +
				'<p>Передайте ученым поднятый вами датчик. Для этого вам необходимо в контейнер researchCenterContainer, ' +
			 	'положить значение с грузового отсека корабля.</p>' +
				'<p>Для получение значения переменной в грузовом отсеке используется функция <span class="under-label">.getFromCargo()</span>.</p>' +
				'<p>BBot сообщит вам об успешной погрузке.</p>';

	}
}
