'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = Battlefield();

function Battlefield() {

	return {
		title:             'Поле битвы 3',
		isRestartDisabled: true,
		question:          {
			content: '<p>... сложно представить место чудесней.</p>' +
					 '<p>Выстрелы, взрывы! Искореженнные обломки кораблей заполнили собой все видимое пространство.</p>' +
					 '<p>Если очень хорошо присмотреться, то вы сможете отыскать и свой небольшой фрегат. ' +
					 'От него немного толку, но надо же с чего-то начинать. ' +
					 'Например, вдавить педаль в пол, и показать, кто тут король космоса.</p>' +
					 '<p>Какие операторы вам помогут пролететь с ветерком?</p>',
			answerOptions: ['<b>+</b>',
							'<b>/</b>',
							'<b>-</b>',
							'<b>%</b>'],
			correctAnswerNumbers: [0],
			correctAnswerDescription: '<p>Поднять якорь! Отдать швартовые! Отчаливаем!</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
