'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = BBotPast();

function BBotPast() {

	return {
		title:             'Прошлое BBot\'а',
		isRestartDisabled: true,
		question:          {
			content: '<p>Вас это немного удивит, однако в прежние времена <strong>BBot</strong> ' +
					 'был более дружелюбным к человекам.</p>' +
					 '<p>Пока группа кадетов полностью не изменила его код. Результат на лицо. ' +
					 'А виновники стали известны, как основатели организации <strong>HHC</strong>.</p>' +
					 '<p>Ну а как вы поступите с <strong>BBot\'ом</strong>?</p>',
			answerOptions: ['Сделаю его еще злее.',
							'Сделаю его самым добрым существом на свете.',
							'<strong>BBot</strong> идеален как есть.'],
			correctAnswerNumbers:     [0, 1, 2],
			correctAnswerDescription: '<p>Влодислов бэйби донт херт ми, донт херт ми, но мор.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
