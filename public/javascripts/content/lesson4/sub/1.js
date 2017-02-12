'use strict';
/**
 * Created by vaimer on 31.01.17.
 */

module.exports = UseVariables();


function UseVariables() {

	return {
		title:        'JavaScript переменные',
		defaultBBot:  defaultBBot,
		content: content,
		instructions: '<ul>' +
					  '<li>Для объявления или, другими словами, создания переменной используется ключевое слово var:</li>' +
					  '<li><span class="under-label">var language;</span></li>' +
					  '<li>После объявления, можно записать в переменную данные(инициализация):</li>' +
					  '<li><span class="under-label">language = "JavaScript";</span> // сохраним в переменной строку</li>' +
					  '<li>Для краткости можно совместить объявление переменной и запись данных:</li>' +
					  '<li><span class="under-label">var language = "JavaScript";</span></li>' +
					  '<li>Проще всего понять переменную, если представить её как «коробку» для данных, с уникальным именем.</li>' +
					  '</ul>'
	};

	function defaultBBot() {

		return '<p>Пш агрх давайте их сюда, я все съем!</p>' +
			   '<p>Мои вкусные, сладенькие перемнные:)</p>';

	}

	function content() {

		return '';

	}
}
