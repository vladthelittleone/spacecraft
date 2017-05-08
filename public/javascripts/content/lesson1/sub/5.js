'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = Comments();

/**
 * Урок - 'Комментарии'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Comments() {

	return {
		title:              'Комментарии',
		content:            content,
		// BBot - проказник, не позорься!
		// Нужно понизить его уровень юмора, а то этот Джордж Карлин переходит все границы.
		// Закомментируйте кусок кода на строке 8 и 9, пока никто не видет.
		instructions:       '<ul>' +
							'<li>Закомментируйте кусок кода в строке <strong>8</strong> и <strong>9</strong>.</li>' +
							'<li>Заметим, что код внутри комментариев не выполняется!</li>' +
							'<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
							'</ul>',
		character:          [{
			audio:  'audio/lesson2/5-1',
			css:    'astromen-img'
		},{
			audio:  'audio/lesson2/5-2',
			css:    'astromen-img',
			hint:   [
				{
					'next .ace_scroller': 'Текст, который начинается с // - комментарий',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		},{
			audio:  'audio/lesson2/5-3',
			css:    'astromen-img'
		},{
			audio:  'audio/lesson2/5-4',
			css:    'astromen-img',
			marker:      {
				x1: 1,
				y2: Infinity
			}
		},{
			audio:  'audio/lesson2/5-5',
			css:    'astromen-img',
			marker:      {
				x1: 3,
				x2: 6,
				y2: Infinity
			}
		},{
			audio:  'audio/lesson2/5-6',
			css:    'astrogirl-img'
		},{
			audio:  'audio/lesson2/5-7',
			css:    'astrogirl-img',
			marker:      {
				x1: 8,
				x2: 9,
				y2: Infinity
			}
		}],
		interpreterHandler: interpreterHandler
	};

	function interpreterHandler(value) {

		var lessonResults = LessonResults({

			correct: '<p>Что-т0 преднозначенное для человека! Комментарии?</p>',

			unknownError: '<p>Эй, BBot не хочет уничтожать человекорасу! Наверно...</p>' +
						  '<p>Похоже вы забыли поставитb //.</p>'

		});

		// При комментировании результат будет возвращен ввиде 'undefined'
		return lessonResults.result(!value);
	}

	function content() {

		return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, перейдем к следующей части урока.</p>' +
			'<p>Вы наверно уже заметили, что текст, который начинается с <span class="under-label">//</span>, является комментарием и преднзаначен для человека.</p>' +
			'<p>Комментарии делают код более понятным для вас и вашей команды. Поэтому, если вдруг корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>' +
			'<p><strong>JavaScript</strong> поддерживает два типа комментариев: однострочные и многострочныe.</p>';

	}
}
