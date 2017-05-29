'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = IdEndNear();

function IdEndNear() {

	return {
		title:             'Конец близок?',
		isRestartDisabled: true,
		question:          {
			content: '<p>Думали это все? ' +
					 'Вам показалось, что предыдущий вопрос должен быть последним?</p>'+
					 '<p>Не волнуйтесь, методисты академии уже лет 15 знают ' +
			         'о неудачном расположении вопросов в этом тесте. Еще лет 50-72 и проблему решат.</p>' +
					 '<p>А пока, вы должны ответить на следующий вопрос: ' +
					 'каким будет результат выполнения выражения <span class="under-label">156 % 67.</span></p>',
			answerOptions:            ['2', '62686567164', '22', '156'],
			correctAnswerNumbers:     [2],
			correctAnswerDescription: '<p>BBot любит, когда кадеты испытывают разочарование.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
