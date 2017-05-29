'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = SolveBBotProblem();

function SolveBBotProblem() {

	return {
		title: 			'Решение проблемы с BBot\'ом',
		isRestartDisabled: true,
		question: {
			content: '<p>Несмотря на всю условность описываемых ситуаций, ' +
					 'шалости <b>BBot’a</b> могут быть вполне реальными.</p>' +
					 'Не позволять <b>BBot’у</b> пакостить не сложная задача, ' +
					 'но Академия предпочитает, чтобы кадеты решали эту проблему сами.</p>' +
					 'Для начала, можно попробовать, не позволять <b>BBot’у</b> приближаться к вашему кораблю.</p>' +
					 '<p>Для этого достаточно понять, что существо, которое пытается попасть на корабль, это <b>BBot</b>.</p>',
			answerOptions: ['passenger != “BBot”',
							'passenger > "BBot"',
							'passenger',
							'passenger == "BBot"'],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: '<p>Этого будет мало против великого BBot\'a.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
