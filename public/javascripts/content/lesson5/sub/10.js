'use strict';

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

		return '<p>Вы хорошо потрудились кадет. Благодаря вам, мы узнали кто пилотировал корабль. ' +
			'К сожалению, наши опасения оправдались. Пилота зовут Толиум Девилопер, известный пират-космоскейтер, ' +
			'который грабит караваны ресурсов. Мы начинаем подготовку к задержанию. Будте на связи.</p>';

	}

	function defaultBBot() {

		return '<p>BBot негодует! Какой-то пр0хвост ворует то, что принадлежит BBot'у.</p>'

	}
}
