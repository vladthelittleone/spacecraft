'use strict';

// Экспорт
module.exports = Content();

/**
 * Контент первого урока.
 *
 * Created by vladthelittleone on 12.06.16.
 */
function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints:    300,
		// Штрафные очки за действия на уроке.
		exception:      50,
		incorrectInput: 50
	};

	return {
		text:                          'Поступление в академию',
		label:                         'Основы JavaScript',
		quote:                         'Знания свет — путь укажет нам',
		sub:                           require('./sub'),
		points:                        points,
		maxAttemptLessonCountForBonus: 3
	};

}
