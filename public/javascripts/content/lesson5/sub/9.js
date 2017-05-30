'use strict';

var LessonResults = require('../../lesson-results');

module.exports = Pursuit();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function Pursuit () {

	return {
		isRestartDisabled: true,
		title: 'Вперед! В погоню!',
		content: content,
		instructions: '<ul>' +
		'<li>Догоните корабль, используя изученные арифметические операторы;</li>' +
		'<li>Для того чтобы увеличить скорость корабля, изменяйте значение переменной currentSpeed;</li>' +
		'<li>Скорость должна изменяться постепенно (не более чем на 1GY/S за раз) и значение скорости не должно превышать 60GY/S. ' +
		'Иначе двигатель перегреется, и скорость уменьшится до 20;</li>' +
		'<li>Как только Вы приблизитесь на дистанцию менее 20GY до корабля противника активируйте устройство перехвата.</li>' +
		'</ul>',
		hint: '<ul>' +
		'<li>я пока хз, как сделать так чтобы скорость при достижении 60 не увеличивалась, Влад вроде знает</li>' +
		'<li>Узнать, что расстояние до корабля меньше 20 можно так <span class="red-label">distanceToTheDrones < 20</span></li>' +
		'<li>Узнать, что расстояние до корабля равно 0 можно так <span class="red-label">distanceToTheDrones == 0</span></li>' +
		'</ul>',
		gamePostUpdate: gamePostUpdate,
	};

	function content () {

		return '<p>Корабль противника находится в пределах прямой видимости. Мы глушим все внешние коммуникации противника, ' +
			'но заложенная в корабль автономная программа не позволяет ему остановиться. ' +
			'Вам, как будущему пилоту, поставлена задача догнать и захватить корабль противника.</p>';

	}

	function gamePostUpdate (api, param2, param3, text) {

		var lessonResults = LessonResults({
											  correct: '<p>Было не так зрелищно, как BBot рассчитывал, но зато у Кадета все получилось.</p>',
											  unknownError: '<p></p>',
											  text: text
										  });

		if (api && api.isHackAvailable()) {

			return lessonResults.resultCorrect();

		} else {

			return lessonResults.text(text);

		}

	}
}
