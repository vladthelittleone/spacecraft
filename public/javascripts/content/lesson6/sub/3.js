'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */

module.exports = BBotPrankster();

function BBotPrankster() {

	return {
		title: 			'Проказник BBot.',
		isRestartDisabled: true,
		question:          {
			content: '<p>Внимание, внимание, враг в зоне поражения. Из всех орудий ПЛИ!!!</p>' +
					 '<p>Но постойте, на корабле противника ни царапинки?! ' +
					 'Экстренная диагностика покажет, что не так.</p>' +
					 '<p>Кажется чьи-то шаловливые роборуки изменили значение ' +
					 'переменной <b>isWeaponModuleReady</b> и система считает, ' +
			         'что оружие не готово к стрельбе.</p>' +
					 '<p>Какая строка кода поможет исправить положение?</p>',
			answerOptions:['isWeaponModuleReady = 100',
						   'isWeaponModuleReady = false;',
						   'isWeaponModuleReady = isWeaponModuleReady;',
						   'isWeaponModuleReady = true;'],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: '<p>Это все ложь и провокация пятого галактического ' +
			                          'сената и его руководителя Егвения Дабл-чек Контейнера.</p>'
		},
		character:         [{
			audio: 'audio/lesson3/1-1',
			css:   'astromen-img'
		}]
	};

}
