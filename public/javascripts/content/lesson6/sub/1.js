'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = Battlefield();

function Battlefield() {

	return {
		title:             'Поле битвы.',
		isRestartDisabled: true,
		question:          {
			content: '<p>...сложно представить место чудесней.</p>' +
					 '<p>Выстрелы, взрывы, повсюду искореженные обломки боевых исполинов.</p>' +
					 '<p>Если очень хорошо присмотреться, то вы сможете отыскать и свой небольшой кораблик. ' +
					 'От него немного толку, но надо же с чего-то начинать. ' +
					 'Например, можно запустить двигатель и  попробовать набрать скорость.</p>' +
					 '<p>Какие операторы вам помогут пролететь с ветерком?</p>',
			answerOptions: ['+, ++, *',
							'/, --, -',
							'+, -, --',
							'*, -, ++'],
			correctAnswerNumbers: [0],
			correctAnswerDescription: '<p>Отдать швартовые, мы отчаливаем. И это точно.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
