'use strict';

// Зависимсоти
var Storage = require('../../../utils/storage');

module.exports = End();

/**
 * Урок - 'Ваше имя?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function End() {

	var storage = Storage();

	return {
		title:        'Да начнется долгий путь...',
		defaultBBot:  defaultBBot,
		video:	 	 {
			url: 'https://youtu.be/G8M4zM-lbvA',
			title: 'Кто такие программисты?'
		},
		content:      function () {

			return '<p>Поздравляю, теперь вы официально числитесь в академии, кадет!</p>' +
				   '<p>Вам предстоит нелегкий путь, чтобы получить гордое звание офицера флота.</p>' +
				   '<p>Желаю удачи!</p>';

		},
		instructions: '<ul>' +
					  '<li>Нажмите «Далее» для продолжения.</li>' +
					  '</ul>',
		character:    [{
			audio: 'audio/lesson1/3-1',
			css:   'astromen-img'
		}]
	};

	function defaultBBot() {

		// Так как на данный момент (18.05.2017) мы опираемся на local-storage,
		// то неплохо бы делать предварительные проверки на существование искомых элементов.
		var name = (storage.local.getItem('userName') || "неизвестно").toUpperCase();
		var age = storage.local.getItem('userAge') || "НЕИЗВЕСТНО";

		return '<p>Статус: ЗАЧИСЛЕН</p>' +
			   '<p>Имя: ' + name + '</p>' +
			   '<p>Раса: ЧЕЛОВЕК</p>' +
			   '<p>Возраст: ' + age + ' GY</p>'

	}
}
