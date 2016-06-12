'use strict';

module.exports = YourName();

/**
 * Урок - 'Ваше имя?'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function YourName() {

	return {
		title:           'Да начнется долгий путь...',
		isNotGameLesson: true,
		defaultBBot:     function () {

			return '<p>Статус: ЗАЧИСЛЕН</p>' +
				'<p>Имя: ' + storage.getString('userName').toUpperCase() + '</p>' +
				'<p>Раса: ЧЕЛОВЕК</p>' +
				'<p>Возраст: ' + storage.getString('userAge') + 'GY</p>'

		},
		content:         function () {

			return '<p>Поздравляю, теперь вы официально числитесь в академии, кадет!</p>' +
				'<p>Вам предстоит нелегкий путь, чтобы получить гордое звание офицера флота.</p>' +
				'<p>Желаю удачи!</p>';

		},
		instructions:    '<ul>' +
						 '<li>Нажмите "Далее" для продолжения.</li>' +
						 '</ul>',
		character:       [{
			audio: 'audio/lesson1/3-1.mp3',
			css:   'astromen-img'
		}]
	};
}
