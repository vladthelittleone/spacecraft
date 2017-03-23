'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */
module.exports = FlightWithInstructions();


function FlightWithInstructions() {

	return {
		isRestartDisabled: true,
		title:        'Переменные - контейнеры?',
		character:    [{
			// Погрузка прошла успешно, теперь летим  к турели.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'click .enhoyhint-play': 'Запустите код',
					'nextButton':             false,
					'showSkip':               false
				}
			]
		},{
			// Переменные свое рода проименнованные контейнеры для хранения каких-то ни было данных.
			// Переменные объявляются с помощью ключевого слова var
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			// Полсе слова var следует имя переменной.
			// Имена переменных содержат буквы цыфры и символы нижнего подчеркивания.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			// Переменные буквы, которых написанные в разных  регеистрах, разные переменные.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   3,
				y2:   Infinity
			}
		}, {
			// Для получения большей информации обратитесь к инструкции.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
		'<li>Для объявления или, другими словами, создания переменной используется ключевое слово <span class="red-label">var</span>.</li>' +
		'<li><span class="red-label">var enemy;</span> - пример объявления переменной</li>' +
		'<li>После объявления, можно записать в переменную данные(инициализация):</li>' +
		'<li><span class="red-label">enemy = "PHP in my enemy";</span> - записываем в переменную строку.</li>' +
		'<li>Для краткости можно совместить объявление переменной и запись данных:</li>' +
		'<li><span class="red-label">var language = "JavaScript";</span></li>' +
		'<li>Имена переменных содержат буквы, цыфры, нижниее подчеркивание.</li>' +
		'<li>Имя переменной не может начинаться с цыфры.</li>' +
		'<li>Переменный буквы, которвых в различных регистрах разные переменные:</li>' +
		'<li><span class="red-label">Container</span> и <span class="red-label">container</span> разные переменные</li>' +
		'</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>И в какую дыру нас еще зашлют?</p>'
		});

		if (spaceCraft.isWithinCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Погрузка завершена. Отправляемся к месту назначения.</p>' +
			'<p> А пока кадет ознакомьтесь с новым материалом.</p>' +
			'<p> Запустите код для начала полета.</p>';
	}
}

