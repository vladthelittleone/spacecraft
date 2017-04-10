'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = VariablesIsContainers();

/**
 * Created by vaimer on 19.02.2017.
 */
function VariablesIsContainers() {

	return {
		isRestartDisabled: true,
		title:             'Контейнер',
		character:         [{
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img'
		}, {
			audio: 'audio/lesson2/1-1.mp3',
			css:   'astromen-img'
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Еще больше информации об объявлении: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Объявления">жмак</a>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				t += e + '</br>';

				r = (e === 'Капсула с галактическим червем' || e === 'Ракетное топливо');

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Открываю короб0чки... Что у нас тут?</p>' +
					 '<p>Транслирую:</p>' +
					 '<p class="bbot-output">' + t + '</p>',

			unknownError: '<p>Кто-то вскрыл контейнеры до нас!</p> ' +
						  '<p>И похитил Галактического червя и Ракетное топливо</p>'

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.unknownError();
	}

	function content() {

		return '<p>Итак, мы создали переменную <strong>container1</strong>. Теперь можно задать ей некоторое значение или, другими словами, инициализовать:</p>' +
			'<pre><strong>container1</strong> = \'Капсула с галактическим червем\';</pre>' +
			'<p>Это значение в дальнейшем будет доступно при обращении по имени переменной.</p>' +
			'<p>Для краткости объявление и инициализацию можно записать на одной строке:</p> ' +
			'<pre>var <strong>container2</strong> = \'Ракетное топливо\';</pre>' +
			'<p>Такую операцию пилоты называют <strong>определением</strong> переменной.</p> ';
	}
}

