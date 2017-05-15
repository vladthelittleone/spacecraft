'use strict';

// Экспорт
module.exports = Content();

/**
 * Контент третьего урока.
 *
 * Created by vladthelittleone on 12.06.16.
 */
function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints:              450,
		// Штрафные очки за действия на уроке.
		exception:                50,
		incorrectInput:           50,
		showHitPenaltyPointsSize: 50
	};

	return {
		text:                          'Расследование',
		label:                         'Основы JavaScript',
		quote:                         'Все мы барахтаемся в грязи, но иные из нас глядят на звёзды',
		defs:                          require('./autocomplete.json'),
		isGameLesson:                  true,
		sub:                           require('./sub'),
		points:                        points,
		maxAttemptLessonCountForBonus: 3
	};

}
