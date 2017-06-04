'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = BBotPrankster();

function BBotPrankster() {

	return {
		title: 			'Проказник BBot',
		isRestartDisabled: true,
		question:          {
			content: '<p>Внимание, внимание! Враг в зоне поражения. Из всех орудий ПЛИ!</p>' +
					 '<p>Но постойте, на корабле противника ни царапинки?! ' +
					 'Экстренная диагностика покажет, что не так.</p>' +
					 '<p>Кажется чьи-то шаловливые роборуки изменили значение ' +
					 'переменной <b>isWeaponModuleReady</b>, из-за чего невозможно открыть стрельбу.</p>' +
					 '<p>Какая строка кода поможет временно исправить положение?</p>',
			answerOptions:['<strong>isWeaponModuleReady</strong> = 100;',
						   '<strong>isWeaponModuleReady</strong> = false;',
						   '<strong>isWeaponModuleReady</strong> = isWeaponModuleReady;',
						   '<strong>isWeaponModuleReady</strong> = true;'],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: '<p>Это все ложь и провокация пятого галактического ' +
			                          'сената и его руководителя Эвджина Дабл Чек Контейнера.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
