'use strict';

var LessonResults = require('../../lesson-results');

module.exports = LessonFinal();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function LessonFinal() {

	return {
		isRestartDisabled:  true,
		title:              'Заслуженный отдых?',
		defaultBBot:  defaultBBot,
		content:            content,
		character:          [],
		instructions:       '<ul><li>Нажмите далее</li></ul>'
	};

	function content() {

		return '<p>Вы хорошо потрудились кадет. Благодаря вам, мы узнали кто пилотировал захваченный вами корабль. ' +
			'К сожалению наши опасения оправдались. Пилота зовут Толиум Девилопер, известный пират-космоскейтер, ' +
			'который грабит наши караваны с ресурсами. Но не стоит об этом беспокоится. Лучше отдохните немного, ' +
			'посмотрите новую серию «Мика и Рорти» или выпейте чего-нибудь. До скорого кадет. </p>';

	}

	function defaultBBot() {

		return '<p>Для чего BBot создан?</p>'

	}
}
