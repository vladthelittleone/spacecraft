'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = MoreAboutVariables();

function MoreAboutVariables() {

	return {
		isRestartDisabled: true,
		title:        'Копирование значений переменных',
		character:    [{
			// Отправляйтесь к оружейному складу. Запускаем двигатели
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  	'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Сколько еще нудных речей придется выслушать?</p>'
		});

		if (spaceCraft.isWithinCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Небольшое замечание. Переменные container и Container две разные переменные.</p>' +
			   '<p>Когда значение переменной не определно, при использование переменной получаем значение undefined.</p>' +
			   '<p>Значение одной переменной можно скопировать в другую переменную.</p>';

	}
}
