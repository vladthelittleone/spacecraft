'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = ItIsTheEnd();

function ItIsTheEnd() {

	return {
		title:             'И это конец?',
		isRestartDisabled: true,
		question:          {
			content: '<p>Вы проделали неплохую работу, отвечая на все эти скучные вопросы. ' +
			         'Впрочем, ваши страд... приключения только начинаются. До скорого.</p>',
			answerOptions:            ['Вперед, в далекие дали!'],
			correctAnswerNumbers:     [0],
			correctAnswerDescription: '<p>Если кадет забыл, то выход справа.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
