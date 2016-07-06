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
		totalPoints: 1000,
		// Штрафные очки за действия на уроке.
		exception: 100,
		runError: 50,
		incorrectInput: 40,
		//Текущее число очков по уроку.
		currentPoints: "undefined"
	};

	points.currentPoints = points.totalPoints;

	return {
		text:  'Поступление в академию',
		label: 'Основы JavaScript',
		quote: 'Знания свет — путь укажет нам',
		sub:   require('./sub'),
		points: points
	};

}
