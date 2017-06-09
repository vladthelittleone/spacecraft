'use strict';

module.exports = Conclusions();

/**
 * Урок - 'Выводы';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Conclusions() {

	return {
		title:             'Поспешные выводы',
		defaultBBot:       defaultBBot,
		content:           content,
		isRestartDisabled: true,
		instructions:      '<ul>' +
						   '<li>Нажмите «Далее» для продолжения.</li>' +
						   '</ul>',
		character:         [{
			audio: 'audio/lesson3/11-1',
			css:   'astromen-img'
		}]
	};

	function content() {

		return '<p>Отличная работа кадет! Датчик принадлежал фракции <b>PHP</b>.</p>' +
			'<p>Что-то нечисто в этом деле. Наш отдел внешней разведки займется поиском улик.</p>' +
			'<p>Возвращайтесь к обучению. Мы будем держать вас в курсе. И самое главное - ' +
			'поспешные выводы опасны.</p>';

	}

	function defaultBBot() {

		return '<p>Ничто так не обманчиво, как слишком очевидные факты.</p>'

	}
}
