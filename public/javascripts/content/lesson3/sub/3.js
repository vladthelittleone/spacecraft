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
		title:             'Копирование',
		character:         [{
			// Отправляйтесь к оружейному складу. Запускаем двигатели
			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img'
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '<li>Больше информации о переменных в <strong>JavaScript</strong>: <a href="https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics#Переменные">клац</a>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var v1 = '';
		var v2 = '';

		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				if (lodash.isNil(e)) {

					v1 += e;

				} else {

					v2 += e;

					r = (e === 'Нога робота');
				}

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Кто-т0 спёр мою робоногу!</p>' +
					 '<p>Так, так, так, что тут у нас?</p>' +
					 '<p class="bbot-output">' + v1 + '</p>' +
					 '<p class="bbot-output">' + v2 + '</p>' +
					 '<p>Кадет! Это не смешно!</p>',

			unknownError: '<p>Кто-то украл мою ногу!</p>'

		});

		if (r) {

			return lessonResults.resultCorrect('bbot-angry');

		}

		return lessonResults.unknownError();
	}

	function content() {

		return '<p>В <strong>JavaScript</strong> регистр имеет значение. <strong>container</strong> и <strong>Container</strong> две разные переменные.</p>' +
			'<p>Если переменная не инициализирована, то значение этой переменной будет равно <strong class="under-label">undefined</strong>.</p>' +
			'<p>Значение одной переменной можно скопировать в другую переменную.</p>';

	}
}
