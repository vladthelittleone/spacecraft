'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

/**
 * Created by vaimer on 31.01.17.
 */

module.exports = UseVariables();


function UseVariables() {

	return {
		title:        'Погрузка нового оружия',
		character:    [{
			// Приветсвуем вас кадет. Сегодня вам предстоит освоить работу с контейнерами и грузовым отсеком корабля.
			// Вам необходимо перевезти новое оружие из академии к защитной турели. После атаки этих этих Пыхальщиков
			// вооружение турели вышло из строя. Погрузите на свой корабль неисправное мехнизмы их необходимо изучить.
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}, {
			// Запустите программу, чтобы погрузить на свой корабль конейнер с оружием.
			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'click .enhoyhint-play': 'Запустите код',
					'nextButton':             false,
					'showSkip':               false
				}
			]
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		instructions: '<ul>' +
					  '<li>Время не ждет! Немедленно приступайте к выполнению задания.</li>' +
					  '<li>Запустите код,  нажав на кнопку<i class="glyphicon glyphicon-play green"></i></li>' +
					  '</ul>'
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Что нас понизили до погрузки?</p>' +
					 '<p>Дайте мне другого человка, порасторопней:)</p>'
		});

		if (spaceCraft.isUseCargo()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Полсе нападения фракции PHP вышла из строя наша защитная турель у RED планеты.</p>' +
			'<p>Вам необходимо заменить оружние у турели, а сломанное доставить для исследования на оружейную станцию.</p>' +
			'<p>Запустите код, чтобы начать погрузку нового образца оружия.</p>';

	}
}
