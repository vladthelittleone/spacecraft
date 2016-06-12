'use strict';

module.exports = YourName();

/**
 * Урок - 'Ваше имя?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function YourName() {

	return {
		title:           'Ваше имя?',
		isNotGameLesson: true,
		content:         function () {

			return '<p>Так, новенький, нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
				'<p>Введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
				'<p>Высылаю вам инструкции по выполнению.</p>'

		},
		instructions:    '<ul>' +
						 '<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="under-label">"Нилар"</span>.</li>' +
						 '<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
						 '</ul>',
		character:       [{
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
		result:          function (value) {

			var botText = BBotText({
				correct: '<p>Ура! BBot понял человек0-имя, транслирую:</p>'
						 + '<p class="bbot-output">' + value + '</p>',

				unknownError: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
							  '<p>### Внимателbней прочитайте инструкции и попробуйте снова.</p>',

				noQuotes: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
						  '<p>Похоже вы забыли использоватb кавычки.</p>',

				isNumeric: '<p>Упс! BBot полагает, что человеческое имя не может быть числом!</p>' +
						   '<p>Если вы робот или имперский штурмовик, обратитесb в учебный совет академии.</p>',

				emptyInput: '<p>Упс! BBot не получил ваше человеческое имя!</p>' +
							'<p>### Внимателbней прочитайте инструкции и попробуйте снова.</p>'
			});

			if (value) {

				// Если нет " ", будет выброшено исключение
				if (value.exception) {

					return botText.resultNotCorrect('noQuotes');

				}

				// Если введено число, то результат отрицательный
				if (isNumeric(value)) {

					return botText.resultNotCorrect('isNumeric');

				}

				// "Ваше имя" - регулярка направлена
				// на поиск имени в скобках.
				var reg = new RegExp('(.+).*');

				storage.setString('userName', value);

				return botText.result(reg.test(value));

			}

			return botText.resultNotCorrect('emptyInput');

		}
	};
}
