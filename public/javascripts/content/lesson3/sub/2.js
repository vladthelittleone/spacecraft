'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */
module.exports = VariablesIsContainers();


function VariablesIsContainers() {

	return {
		isRestartDisabled: true,
		title:        'Иницализация переменных',
		character:    [{
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  	'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>И в какую дыру нас еще зашлют?</p>'
		});

		if (spaceCraft.isWithinCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Надеюсь вы уловили первый принцип создания переменных -> <span class="under-label">var имя_переменной</span>.</p>' +
			   '<p>Задать значение перемнной(инициализовать) можно с помощью знака "=": <span class="under-label">container1 = "Галактический червь"</span></p>' +
			   '<p>Объявление и инициализацию переменной можно записать на одной строчке для краткости: <span class="under-label">var container2 = "Ракетное топливо"</span></p>' +
			   '<p>Запустите код, чтобы вывести значения переменных.</p>';
	}
}

