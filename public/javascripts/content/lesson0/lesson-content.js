'use strict';

// Экспорт
module.exports = Content();

/**
 * Контент первого урока.
 *
 * Created by vladthelittleone on 12.06.16.
 */
function Content() {

	return {
		text:  'Поступление в академию',
		label: 'Основы JavaScript',
		quote: 'Знания свет — путь укажет нам',
		rules: '../../../content/lesson0/autocomplete.json',
		sub:   require('./sub')
	};

}
