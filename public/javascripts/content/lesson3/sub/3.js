'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 19.02.2017.
 */

module.exports = TaskWithVariables();


function TaskWithVariables() {

	return {
		isRestartDisabled: true,
		title:        'Копирование данных',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'
		},{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		},
			{
				audio:  'audio/lesson2/1-1.mp3',
				css:    'astromen-img',
			}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
						'<li>На третий строчке объявите переменную <span class="red-label">container</span>, с помощью ключевого слова <span class="red-label">var</span></li>' +
						'<li>И задайте ей значение <span class="red-label">"Ионная пушка"</span>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Этот хлам и есть плазменная пушка?</p>'
		});

		if (spaceCraft.getFromCargo() === 'Сломанное оружие') {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Выполните небольшое задание, чтобы проверить усвоенный материал.</p>' +
			   '<p>На 3 строчке вам необходимо объявить переменную container и иницилизовать ее значением "Ионная пушка".</p>';
	}
}
