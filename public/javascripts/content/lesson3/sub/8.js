'use strict';

module.exports = TheEndOfTheLesson();

/**
 * Created by vaimer on 09.04.2017.
 */
function TheEndOfTheLesson() {

	return {
		isRestartDisabled: true,
		title:             'Главное двигаться вперед',
		character: [{

			audio: 'audio/lesson4/8-1',
			css:   'astromen-img'

		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите «Далее» для продолжения.</li>' +
					  '</ul>'
	};

	function content() {

		return '<p>Вы успешно справились с заданием, кадет. ' +
			'Наши ученые из исследовательского центра прольют свет на эту историю. </p>' +
			'<p>Раньше меня тоже вела дорога приключений, но потом мне прострелили ногу.</p>' +
			'<p>Поэтому мой вам совет: пока есть возможность и силы - только вперед!</p>';

	}

	function defaultBBot() {

		return '<p>Главное, чтобы в иллюминат0ре был прекрасный вид.</p>';

	}
}
