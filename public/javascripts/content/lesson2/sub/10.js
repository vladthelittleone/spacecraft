'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = Decode();

/**
 * Урок - 'Дешифровка';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Decode() {

	return {
		title:              'Дешифровка',
		content:            content,
		isRestartDisabled:  true,
		instructions:       '<ul>' +
							'<li>Найдите все <strong>строки</strong> в зашифрованном куске данных. Напомним, что строка начинается и заканчивается апострофом.</li>' +
							'<li>После, с помощью полученных частей, составьте предложение и введите его в редакторе кода.</li>' +
							'<li>Результат должен быть представлен в виде <strong>строки</strong>.</li>' +
							'<li>Попробуйте раскомментировать зашифрованные кусок данных. Что получится?</li>' +
							'</ul>',
		hint:               '<ul>' +
							'<li>Куски строк, зашифрованные в редакторе кода: ' +
							'<span class="under-label-gray">\'ия \'</span>, ' +
							'<span class="under-label-gray">\'акц\'</span>, ' +
							'<span class="under-label-gray">\'Фр\'</span>, ' +
							'<span class="under-label-gray">\'PHP\'.</span>' +
							'</li>' +
							'<li>Введите предложение: \'Фракция PHP\'.</li>' +
							'</ul>',
		character:          [{
			audio: 'audio/lesson3/10-1',
			css:   'astromen-img',
			waitForHint: true,
			hint:  [
				{
					'next .ace_scroller': 'Зашифрованные куски данных',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}, {
			audio: 'audio/lesson3/10-2',
			css:   'astromen-img'
		}, {
			audio:       'audio/lesson3/10-3',
			css:         'astromen-img',
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

		return '<p>Итак, в результате взлома были обнаружены зашифрованные куски данных. ' +
			'Вы можете наблюдать их в редакторе кода.</p>' +
			'<p>Кадет, ваша задача дешифровать эти данные: найдите все <strong class="under-label">строки</strong>, ' +
			'входящие в этот массив данных, и составьте из полученных кусков предложение.</p>' +
			'<p>Высылаю вам инструкции по выполнению.</p>';

	}

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Дешифровка сообщения:</p>' +
					 '<p class="bbot-output">\'' + value + '\'</p>',

			unknownError: '<p>Бессвязное предложение!</p>' +
						  '<p>Напомню, что стр0ка начинается с апострофа.</p>' +
						  '<p>И заканчивается.</p>'
		});

		// Если выброшено исключение
		if (value && value.exception) {

			return lessonResults.unknownError();

		}

		// Проверка на тип
		return lessonResults.result(value === 'Фракция PHP');
	}
}
