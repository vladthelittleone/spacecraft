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

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
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

		return  '<p>.</p>' +
				'<p>Константы - это переменные, значения которых <span class="under-label">НИКОГДА</span> не меняется, ' +
				'как правило имена таких переменных пишутся заглавными буквами.</p>' +
				'<p>Очень важно! Значение константы задается <span class="under-label">сразу</span>,  при ее объявлении.</p>' +
				'<p>Переменные, которым не присволили значения будут undefined.</p>' +
				'<p>>Для обозначения пустоты переменной используется специально слово null.</p>';

	}
}
