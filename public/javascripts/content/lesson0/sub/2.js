'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');
var Storage = require('../../../utils/storage');

module.exports = YourName();

/**
 * Урок - 'Ваше имя?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function YourName() {

	var storage = Storage();

	return {
		title:              'Ваше имя?',
		content:            content,
		instructions:       '<ul>' +
							'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="under-label">\'Нилар\'</span>.</li>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson1/1-1.mp3',
			css:   'astromen-img',
			hint:  [{
				'next .ace_scroller': 'Введите свое имя в кавычках',
				'nextButton':         {text: 'Далее'},
				'showSkip':           false
			}]
		}, {
			audio:       'audio/lesson1/1-2.mp3',
			css:         'astrogirl-img',
			waitForHint: true,
			hint:        [{
				'click .lesson-alt-hint': 'Нажмите для получения инструкций',
				'nextButton':             false,
				'showSkip':               false
			}]
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Так, новенький, нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
			'<p>Введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
			'<p>Высылаю вам инструкции по выполнению.</p>'

	}

	function isNumeric(n) {

		return !isNaN(parseFloat(n)) && isFinite(n);

	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Ура! BBot понял человек0-имя, транслирую:</p>'
					 + '<p class="bbot-output">' + value + '</p>',

			unknownError: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
						  '<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			noQuotes: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
					  '<p>Похоже вы забыли использоватb кавычки.</p>',

			isNumeric: '<p>Упс! BBot полагает, что человеческое имя не может быть числом!</p>' +
					   '<p>Если вы робот или имперский штурмовик, обратитесb в учебный совет академии.</p>',

			emptyInput: '<p>Упс! BBot не получил ваше человеческое имя!</p>' +
						'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'
		});

		if (value) {

			// Если нет ' ', будет выброшено исключение
			if (value.exception) {

				return lessonResults.resultNotCorrect('noQuotes');

			}

			// Если введено число, то результат отрицательный
			if (isNumeric(value)) {

				return lessonResults.resultNotCorrect('isNumeric');

			}

			// "Ваше имя" - регулярка направлена
			// на поиск имени в скобках.
			var reg = new RegExp('(.+).*');

			storage.local.setItem('userName', value);

			return lessonResults.result(reg.test(value));

		}

		return lessonResults.resultNotCorrect('emptyInput');

	}
}
