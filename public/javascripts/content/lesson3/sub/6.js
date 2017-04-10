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

			correct: '<p>Прощай прекрасный датчик!</p>' +
					 '<p>Твой к0д логичен и прост.</p>' +
					 '<p>А говорят, что робот не может любить.</p>',

			unknownError: '<p>Неизвестная ошибка!</p>' +
						  '<p>Вам не0бходимо прибыть к иследовательсному центру.</p>' +
						  '<p>Координаты: 400, 2000.</p>',

			text: '<p>Следуйте за белым кроликом!</p>'
		});

		if (harvester.isNearPoint(400, 2000)) {

			return lessonResults.resultCorrect('bbot-wow');

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Проведем время в полете с пользой: поговорим о других особенностях работы с переменными.</p>' +
			'<p>Существуют переменные, значения которых <span class="under-label">никогда</span> не меняются. ' +
			'Пилоты называют их константами и как правило пишут имена таких переменных заглавными буквами. ' +
			'Константы объявляются с помощью ключевого слова <strong>const</strong>, а значение константы задается ' +
			'<span class="under-label">сразу</span>, при ее объявлении.</p>' +
			'<p>Вы еще не забыли о <strong>undefined</strong> и <strong>null</strong>?</p>' +
			'<p>Переменные, которым не присволили значения, будут хранить идентификатор <strong>undefined</strong>. ' +
			'Для обозначения неизвестного значения переменной используется специально слово <strong>null</strong>.</p>';

	}
}
