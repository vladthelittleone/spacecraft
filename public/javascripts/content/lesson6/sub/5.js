'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = BBotPast();

function BBotPast() {

	return {
		title:             'Прошлое BBot\'а.',
		isRestartDisabled: true,
		question:          {
			content: '<p>Вас это немного удивит, однако в прежние времена BBot более дружелюбным к человекам.</p>' +
					 '<p>Пока группа кадетов полностью заменила его код. Результат на лицо. ' +
			         'Ну а виновники стали известны, как основатели организации HHC.' +
					 '<p>Ну а как вы повлияете BBot\'a?</p>',
			answerOptions: ['Сделаю его еще злее.',
							'Сделаю его самым добрым существом на свете.',
							'BBot идеален как есть.'],
			correctAnswerNumbers:     [0, 1, 2],
			correctAnswerDescription: '<p>Влодислов байби донт хертми, донт хертми со мор.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
