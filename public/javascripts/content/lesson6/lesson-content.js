'use strict';

// Экспорт
module.exports = Content();

/**
 * Created by vaimer on 15.02.2017.
 */
function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints: 500,
		// Штрафные очки за действия на уроке.
		exception: 35,
		incorrectInput: 25
	};

	return {
		text:  'Поиск истины или как проверить еду на яд',
		label: 'Основы JavaScript',
		quote: 'У истины простая речь.',
		defs: require('./autocomplete.json'),
		sub:   require('./sub'),
		isGameLesson: true,
		points: points,
		maxAttemptLessonCountForBonus: 4
	};

}
