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
		runOnStart:        true,
		title:             'К исследовательскому центру',
		character:         [{
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img',
		}, {
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img',
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Информация по ключевому слову <strong>const</strong>: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/const">чпоньк</a>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(harvester) {

		var lessonResults = LessonResults({
			correct: '<p>Бип Бип... роботы, офицеры, гуманоиды на выход. Кадеты работать и учиться!</p>',

			text: '<p>Следуйте за белым кроликом!</p>'
		});

		if (harvester.isNearPoint(400, 2000)) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Проведем время в полете с пользой. Поговорим о константах.</p>' +
			'<p>Константы - это переменные, значения которых <span class="under-label">НИКОГДА</span> не меняется, ' +
			'как правило имена таких переменных пишутся заглавными буквами.</p>' +
			'<p>Очень важно! Значение константы задается <span class="under-label">сразу</span>,  при ее объявлении.</p>' +
			'<p>Переменные, которым не присволили значения будут <strong>undefined</strong>.</p>' +
			'<p>>Для обозначения пустоты переменной используется специально слово <strong>null</strong>.</p>';

	}
}
