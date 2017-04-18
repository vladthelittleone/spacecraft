'use strict';

module.exports = RotateLeft();


/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function RotateLeft() {

	return {
		title:             'Столкновение',
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Хорошо, начнем с увертюры.</p>' +
									  '<p></p>Представте, что Вы пилотируете космический корабль. ' +
									  'И вот-вот столкнетесь с огромным метеоритом летящим навстречу. ' +
									  'От капитана поступает приказ: <i>"Мистер Сулу немедленно выполнить поворот налево”</i>.<p> ' +
									  '<p>Какую команду вы отдадите кораблю?</p>',
			answerOptions:            [
				{text: 'transport.rotateRight()'},
				{text: 'transport.rotateLeft()'},
				{text: 'transport.rotate()'},
				{text: 'transport.stop()'}
			],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: '<p>transport.rotateLeft()</p>' +
									  '<p>rotate left - поворот налево.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
