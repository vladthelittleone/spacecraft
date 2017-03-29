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
		title:        'Копирование значений переменных',
		character:    [{
			// Отправляйтесь к оружейному складу. Запускаем двигатели
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
		}],

		interpreterHandler: interpreterHandler,

		content: content,

		instructions: '<ul>' +
					  	'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					  '</ul>'
	};

	function interpreterHandler(v) {

		var t = '';
		var r = false;

		if (v && v.forEach) {

			v.forEach(function (e) {

				if(lodash.isNil(e))
				{
					t += '0й, Вы хотитЕ меня 0бмануть, в коробке ->' + e + '</br>';
				}

				if(!lodash.isNil(e))
				{
					t += 'Что? Это не моё! Бедный йорик, от него осталась только ' + e + '</br>';

					r = (e === 'Нога робота');
				}

			});

		}

		var lessonResults = LessonResults({

			correct: '<p>Всрываю контейнер после копирования... </p>' +
					 '<p class="bbot-output">' + t + '</p>' +
					 '<p>П0хоже к0пирование прошлО нЕ полностью.</p>',

			text: t

		});

		if (r) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();
	}

	function content() {

		return '<p>Небольшое замечание. Переменные container и Container две разные переменные.</p>' +
			   '<p>Когда значение переменной не определно, при использование переменной получаем значение undefined.</p>' +
			   '<p>Значение одной переменной можно скопировать в другую переменную.</p>';

	}
}
