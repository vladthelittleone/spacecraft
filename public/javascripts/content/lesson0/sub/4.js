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
		content:      function () {

			return '<p>Поздравляю, теперь вы официально числитесь в академии, кадет!</p>' +
				'<p>Вам предстоит нелегкий путь, чтобы получить гордое звание офицера флота.</p>' +
				'<p>Желаю удачи!</p>';

		},
		rightToolbarStatus: {
			codeRunIsActive: false
		},
		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>',
		character:    [{
			audio: 'audio/lesson1/3-1.mp3',
			css:   'astromen-img'
		}]
	};

	function defaultBBot() {

		return '<p>Статус: ЗАЧИСЛЕН</p>' +
			'<p>Имя: ' + storage.local.getItem('userName').toUpperCase() + '</p>' +
			'<p>Раса: ЧЕЛОВЕК</p>' +
			'<p>Возраст: ' + storage.local.getItem('userAge') + 'GY</p>'

	}
}
