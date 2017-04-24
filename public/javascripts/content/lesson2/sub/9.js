'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = TypeOf();

/**
 * Урок - 'Оператор typeof';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function TypeOf() {

	return {
		title:              'Идентификация типа',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Определите тип числа <span class="red-label">451</span>.</li>' +
							'<li>Любознательны? Вам сюда: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof">клац</a>.</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Введите <span class="under-label-gray">typeof 451</span> на <strong>11</strong> строке.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson3/9-1',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson3/9-2',
			css:   'astromen-img',
			marker: {
				x1: 5,
				y2: Infinity
			},
			hint:  [
				{
					'next .ace_scroller': 'Оператор <strong>typeof</strong>',
					'nextButton':                            {text: 'Далее'},
					'showSkip':                              false
				}
			]
		}, {
			audio:  'audio/lesson3/9-3',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Определите тип числа <strong>451</strong>',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}],
		interpreterHandler: interpreterHandler
	};

	function content() {

		return '<p>Вам были представлены основные типы языка <strong>JavaScript</strong>. Но как определить тип данных у операнда?</p>' +
			'<p><span class="under-label"><strong>typeof</strong></span> - оператор, который решает данный вопрос.</p>' +
			'<pre><strong>typeof</strong> операнд</pre>' +
			'<p>В данном случае <span class="under-label"><strong>typeof</strong></span> определит тип данных для операнда, указанного справа.</p>';

	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Готово! Полученный тип:</p>' +
					 '<p class="bbot-output">\'' + value + '\'</p>',

			unknownError: '<p>Неизвестная ошибка.</p>' +
						  '<p>Но не останавливайтесь!</p>' +
						  '<p>Пр0читайте инструкцию еще раз.</p>',

			incorrectType: '<p>Операнд точно число <strong>451</strong>?</p>' +
						   '<p>Очень странный тип данных:</p>' +
						   '<p class="bbot-output">\'' + value + '\'</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		if (value === 'number') {

			// Проверка на тип
			return lessonResults.resultCorrect();

		} else {

			// Тип не соответствует заданному.
			return lessonResults.resultNotCorrect('incorrectType');

		}

	}
}
