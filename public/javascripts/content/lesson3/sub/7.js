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
			  '<li>Добавьте <span class="red-label">researchContainer = harvester.cargoUnload();</span> на <strong>11</strong> строку.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>На строке <strong>11</strong> необходимо присвоить переменной <span class="red-label">researchContainer</span> ' +
					  'значение, возвращаемое командой <span class="red-label">harvester.cargoUnload()</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester,
							lesson,
							player,
							text) {

		var lessonResults = LessonResults({

			correct: '<p>Подтверждаю выгрузку.</p>' +
					 '<p>Исследовтельским центром получен:</p>' +
					 '<p class="bbot-output">Вражеский датчик</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

		});

		if (text &&
			harvester.isCargoUnload() &&
			harvester.isNearPoint(400, 2000) ) {

			return lessonResults.resultCorrect();

		}
	}

	function content() {

		return  '<p>Перед вами наш исследовательский центр. Все самые передовые разработки рождаются именно здесь.</p>' +
				'<p>Передайте ученым поднятый вами датчик: положите в контейнер <strong class="under-label">researchContainer</strong> ' +
			 	'значение с грузового отсека корабля.</p>' +
				'<p>Чтобы получить значение, хранимое в грузовом отсеке, используйте команду:</p>' +
				'<pre><strong>harvester</strong>.cargoUnload();</pre>' +
				'<p><strong>BBot</strong> сообщит вам об успешной погрузке.</p>';

	}
}
