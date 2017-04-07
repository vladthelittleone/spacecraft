'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = goToResearchCenter();

var lodash = require('lodash');

/**
 * Created by vaimer on 24.03.17.
 */
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

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
				'<li>Добавьте <span class="under-label-gray">researchCenterContainer = harverster.cargoUnload();</span> на <strong>14</strong> строку.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  	'<li>На <strong>14</strong> строчке необходимо скопировать значения из грузовго отсека в переменную <span class="red-label">researchCenterContainer</span>.</li>' +
						'<li>Для получения значения, хранящегося в грузовом отсека кораблся воспользуйтесь функцией <span class="red-label">cargoUnload()</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester,
							lesson,
							player,
							text) {

		var t = '';

		if (text && typeof text === 'string') {

			t += 'груз получен -> Вражеский датчик</br>.';
		}

		var lessonResults = LessonResults({

			correct: '<p>Подтверждаю выгрузку.</p>' +
					 '<p>Исследовательский центр  '+ t +'</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

		});

		if (harvester.isCargoUnload() &&
			harvester.isNearPoint(400, 2000) ) {

			return lessonResults.resultCorrect();

		}
	}

	function content() {

		return  '<p>Перед вами кадет наш исследовательский центр. Все самые передовые разработки рождаются именно здесь.</p>' +
				'<p>Передайте ученым поднятый вами датчик. Для этого вам необходимо в контейнер <strong>researchCenterContainer</strong>, ' +
			 	'положить значение с грузового отсека корабля.</p>' +
				'<p>Для получение значения переменной из грузового отсека используется функция <span class="under-label">cargoUnload()</span>.</p>' +
				'<p>BBot сообщит вам об успешной погрузке.</p>';

	}
}
