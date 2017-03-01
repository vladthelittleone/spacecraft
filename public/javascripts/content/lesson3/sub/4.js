'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = FlightStockWithConstantInstructions();

function FlightStockWithConstantInstructions() {

	return {
		title:        'Летим к складу(Теория по константам)',
		character:    [{
			// Отправляйтесь к оружейному складу. Запускаем двигатели
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
			// Среди переменных существует такая разновидность как константы.
			// Это переменные значения которых никогда не меняется.
			// Как правила имена констант пишутся с закглавных букв.
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img',
			marker: {
				x1:   2,
				y2:   Infinity
			}
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}, {
			// Переменные, которым не присвоили(не определили) значения,
			// принимают неопределенное значение undefined
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   3,
				y2:   Infinity
			}
		}, {
			// Для обозначения пустой переменной используется специальное слово null
			// если переменная null, значит она пустая
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			marker: {
				x1:   4,
				y2:   Infinity
			}
		},{
			// Для более подробной информации обратитесь к инструкции
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
		'<li>Константы - это переменные, значения которыъ <span class="under-label">НИКОГДА</span> не меняется, как правило имена ' +
		'таких переменных пишутся заглавными буквами.</li>' +
		'<li><span class="under-label">var MAX_SPEED = 10;</span></li>' +
		'<li>Очень важно, что значение константы задается сразу,  при ее оьъявлении</li>' +
		'<li>Технически в языке JavaScript контсттанта является обычной перемнной, и ее значение можно изменить.</li>' +
		'<li>Однако все опытные пилоты договорились не изменять значения констант.</li>' +
		'<li>Переменные, которым не присволили значения будут undefined.</li>' +
		'<li><span class="under-label">var speed;</span>// undefined</li>' +
		'<li>Для обозначения пустоты переменной используется специально слово null.</li>' +
		'<li><span class="under-label">var php = null;</span></li>' +
		'</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Пора с этим заканчивать</p>'
		});

		if (spaceCraft.isWithinCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Тут какой-то контент!</p>';

	}
}
