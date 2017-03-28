'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 31.01.17.
 */

module.exports = FirstContactWithVariables();


function FirstContactWithVariables() {

	return {
		isRestartDisabled: true,
		title:        'Первое знакомство с переменными',
		character:    [{

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astromen-img'
		}, {

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'

		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>'
	};

	function content() {

		return '<p>Рад снова вас видеть кадет. Ваша задание сегодня перевести датчик в исследовательский центр.</p>' +
			   '<p>Для его выполнения вам потребуется изучить некоторые возможности корабля. Приступим.</p>' +
			   '<p>Обратите внимание на код редакторе. Это самый простой пример использование переменных.</p>' +
			   '<p>Что такое переменные? Это своебразные именные контейнеры, которые хранят различнае значения.</p>' +
			   '<p>Представте подписанный ящик для лучшего понимания.</p>' +
			   '<p>Итак переменные объявляются, другими словами, создаются с помощью ключевого слова <span class="under-label">var</span>.</p>' +
			   '<p>Далее следует имя переменной, которое может состоять из букв цифр символо $ и _ , но не может начинаться с цифры.</p>';

	}

	function defaultBBot() {

		return '<p>Коробочки, BBot любит к0р0б0чки. (=^･ｪ･^=)</p>';

	}
}
