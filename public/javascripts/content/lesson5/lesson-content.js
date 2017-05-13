'use strict';

// Экспорт
module.exports = Content();

/**
 * Created by vaimer on 15.02.2017.
 */

function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints:    400,
		// Штрафные очки за действия на уроке.
		exception:      30,
		incorrectInput: 20
	};

	return {
		text:                          'Догнать за 64 секунды',
		label:                         'Основы JavaScript',
		quote:                         'Баг или фича — вот в чем вопрос…',
		defs:                          require('./autocomplete.json'),
		sub:                           require('./sub'),
		isGameLesson:                  true,
		points:                        points,
		maxAttemptLessonCountForBonus: 4
	};

}
