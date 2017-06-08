'use strict';

module.exports = TheEndOfTheLesson();

/**
 * Created by vaimer on 09.04.2017.
 */
function TheEndOfTheLesson() {

	return {
		isRestartDisabled: true,
		title:             'Главное двигаться вперед',
		video: {
			url: 'https://www.youtube.com/watch?v=rjbt2ga7Ezk&index=5&list=PLJOe7BmEsRtLXM3UnEhvEWDU3ZBe-Us9r',
			title: 'Переменные и константы.'
		},
		character: [{

			audio: 'audio/lesson2/1-2.mp3',
			css:   'astromen-img'

		}, {

			audio: 'audio/lesson2/1-2.mp3',
			css:   'astrogirl-img'

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
