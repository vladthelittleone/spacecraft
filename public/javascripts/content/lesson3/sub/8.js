'use strict';

module.exports = TheEndOfTheLesson();

/**
 * Created by vaimer on 09.04.2017.
 */
function TheEndOfTheLesson() {

	return {
		isRestartDisabled: true,
		title:        'Главное двигаться вперед',
		character:    [{

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astromen-img'
		}, {

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'

		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
		'<li>Нажмите "Далее" для продолжения.</li>' +
		'</ul>'
	};

	function content() {

		return '<p>Вы успешно справились с заданием, кадет. ' +
			'Наши ученые из исследовательского центра прольют свет на эту историю. </p>' +
			'<p>А Вам, я пожелаю удачи, впереди у вас еще много приключений. Помните - только вперед!</p>';

	}

	function defaultBBot() {

		return '<p>Главное, чтобы в иллюминат0ре был прекрасный вид.</p>';

	}
}
