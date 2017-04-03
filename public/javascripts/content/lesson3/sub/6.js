'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = goToResearchCenter();

/**
 * Created by vaimer on 23.03.17.
 */
function goToResearchCenter() {

	return {
		isRestartDisabled: true,
		title:        'Полет к исследовательскому центру',
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
					  	'<li>Информация по ключевому слову const: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/const">чпоньк</a>.</li>' +
					  	'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(scout) {

		var lessonResults = LessonResults({
			correct: '<p>Бип Бип... роботы, офицеры, гуманоиды на выход. Кадеты работать и учиться!</p>'
		});

		if (scout.isWithinDote(380, 2600)) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return  '<p>Проведем время в полете с пользой. Поговорим о константах.</p>' +
			    '<p>Константы - это переменные, значения которых <span class="under-label">НИКОГДА</span> не меняется, ' +
				'как правило имена таких переменных пишутся заглавными буквами.</p>' +
			   	'<p>Очень важно! Значение константы задается <span class="under-label">сразу</span>,  при ее объявлении.</p>' +
				'<p>Переменные, которым не присволили значения будут undefined.</p>' +
				'<p>>Для обозначения пустоты переменной используется специально слово null.</p>';

	}
}
