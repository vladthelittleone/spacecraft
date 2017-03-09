'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');
var Storage = require('../../../utils/storage');

module.exports = GalaxyYear();

/**
 * Урок - 'Галактическая единица'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function GalaxyYear() {

	var storage = Storage();

	return {

		title:              'Галактическая единица',
		content:            content,
		instructions:       '<ul>' +
							'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
							'<li>Для деления используется оператор <span class="under-label">/</span>.</li>' +
							'<li>Например: <span class="under-label">21 / 250</span>.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson1/2-1',
			css:   'astromen-img'
		}, {
			audio:       'audio/lesson1/2-2',
			css:         'astromen-img',
			waitForHint: true,
			hint:        [{
				'click .lesson-alt-hint': 'Нажмите для получения инструкций',
				'nextButton':             false,
				'showSkip':               false
			}]
		}],
		interpreterHandler: function (value) {

			var lessonResults = LessonResults({
				correct: '<p>Ура! BBot разобрал человеческий возраст, транслирую:</p>'
						 + '<p class="bbot-output">' + value + 'GY</p>',

				unknownError: '<p>Упс! BBot не разобрал ваш человеческий возраст!</p>' +
							  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

				emptyInput: '<p>BBot ничего не получил, похоже вы забыли воспользоватbся полем ввода или головой.</p>' +
							'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'
			});

			if (value) {

				if (value.exception) {

					return lessonResults.unknownError();

				}

				storage.local.setItem('userAge', value);

				// Если выведено число, то результат положительный
				return lessonResults.result(isNumeric(value));

			}

			return lessonResults.resultNotCorrect('emptyInput');

		}
	};

	function content() {

		return '<p>Отлично кадет ' + storage.local.getItem('userName') + ', я нашел вас в списках.</p>' +
			'<p>Осталось только ввести ваш возраст в галактической единице измерения времени - <strong>GY</strong>.</p>' +
			'<p>Высылаю вам инструкции.</p>';

	}

	function isNumeric(n) {

		return !isNaN(parseFloat(n)) && isFinite(n);

	}
}
