'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = SpaceWok();

function SpaceWok() {

	return {
		title:             'Космический вок.',
		isRestartDisabled: true,
		question:          {
			content: '<p>И вот вы летите, но не за лапшой. ' +
			         'Во время сражения лучше не стоит отвлекаться на еду. ' +
					 'На великолепную рисовую лапшу с кусочками слегка обжаренных овощей и курицы, ' +
			         'просто объеденье.</p>' +
					 '<p>Ах, да о чем это я, пока мы тут с вами разглагольствовали, ' +
			         'один из противников обнаружил вас! Его нужно немедленно уничтожить! ' +
			         'Но прежде нужно убедиться, что противник в зоне поражения.</p>' +
					 '<p>Какое условие в этом поможет?</p>',
			answerOptions: ['distanсeToEnemy > 100',
							'distanсeToEnemy != 100',
							'distanсeToEnemy <= 100',
							'distanсeToEnemy >= 100'],
			correctAnswerNumbers:     [2],
			correctAnswerDescription: '<p>Вок с двойным моторным маслом BBot\'у.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
