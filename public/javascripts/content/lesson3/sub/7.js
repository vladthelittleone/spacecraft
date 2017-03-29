'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = goToResearchCenter();

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

		instructions: '<ul>' +
					  	'<li>На 14 строчке необходимо скопировать значения из грузовго отсека в переменную <span class="red-label">researchCenterContainer</span>.</li>' +
						'<li>Для получения значения, хранящегося в грузовом отсека кораблся воспользуйтесь функцией <span class="red-label">.getFromCargo()</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({
			correct: '<p>Подтверждаю выгрузку.</p>' +
					 '<p>Иссуледовательский центр - контейнер получен -.</p>',

		});

		if (scout.isGetUseCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return  '<p>Перед вами кадет наш исследовательский центр. Все самые передовые разработки идут именно отсюда.</p>' +
				'<p>Передайте ученым поднятый вами датчик. Для этого вам необходимо в контейнер researchCenterContainer, ' +
			 	'положить значение с грузового отсека корабля.</p>' +
				'<p>Для получение значения переменной в грузовом отсеке используется функция <span class="under-label">.getFromCargo()</span>.</p>' +
				'<p>BBot сообщит вам об успешной погрузке.</p>';

	}
}
