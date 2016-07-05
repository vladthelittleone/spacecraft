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
		totalPoints: 1000,
		exception: 100,
		runError: 50
	};

	return {
		text:  'Поступление в академию',
		label: 'Основы JavaScript',
		quote: 'Знания свет — путь укажет нам',
		sub:   require('./sub'),
		points: points
	};

}
