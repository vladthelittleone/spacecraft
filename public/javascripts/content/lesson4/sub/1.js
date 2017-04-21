'use strict';

module.exports = Testing();

/**
 * Урок - 'Тестирование';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Testing() {

	return {
		title:             'Тестирование',
		defaultBBot:  defaultBBot,
		isRestartDisabled: true,
		question:          {
			content:                  '<p>Здравствуйте, кадет!</p>' +
									  '<p>В этот раз не будет лекций, не будет практики. ' +
									  'Пришло время в первый и не в последний раз проверить насколько успешно ' +
									  '<strong>Вы</strong> усвоили пройденные уроки.</p> ' +
									  '<p>Для этого нужно ответить на несколько вопросов. ' +
									  'Под каждым вопросом будет несколько вариантов ответов. ' +
									  'Правильным может быть как один так и несколько.</p>' +
									  '<p>Выбирайте с умом.</p><p>Вам все понятно?</p>',
			answerOptions:            ['Да'],
			correctAnswerNumbers:     [0],
			correctAnswerDescription: 'Поразительно, что Вы смогли верно ответить на этот вопрос.'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

	function defaultBBot() {

		return '<p>Это вам не тест Тюринга!</p>'

	}

}
