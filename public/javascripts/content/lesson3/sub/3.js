'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

var lodash = require('lodash');

module.exports = MoreAboutVariables();

/**
 * Created by vaimer on 19.02.2017.
 */
function MoreAboutVariables() {

	return {
		isRestartDisabled: true,
		title:        'Копирование',
		character:    [{
			// Отправляйтесь к оружейному складу. Запускаем двигатели
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>Больше информации о переменных в <strong>JavaScript</strong>: <a href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Переменные">клац</a>.</li>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				if(lodash.isNil(e)) {

					t += '0й, Вы хотитЕ меня 0бмануть, в коробке -><p class="bbot-output">' + e + '</p>';

				} else {

					t += 'Что? Это не моё! Бедный йорик, от него осталась только <p class="bbot-output">' + e + '</p>';

					r = (e === 'Нога робота');
				}

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Вскрываю контейнер после копирования... </p>' +
					 '<p>' + t + '</p>' +
					 '<p>П0хоже к0пирование прошлО нЕ полностью.</p>',

			text: 'Кто украл ногу CHI-3PO?'

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>В <strong>JavaScript</strong> регистр имеет значение. <strong>container</strong> и <strong>Container</strong> две разные переменные.</p>' +
			'<p>Когда значение переменной не определено, при использование переменной получаем значение <strong>undefined</strong>.</p>' +
			'<p>Значение одной переменной можно скопировать в другую переменную.</p>';

	}
}
