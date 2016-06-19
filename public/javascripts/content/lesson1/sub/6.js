'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');
var CodeLauncher = require('../../../game/launcher');

module.exports = Alert();

/**
 * Урок - 'Комментарии'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Alert() {

	var time;

	return {
		title:              'Тревога',
		content:            function () {

			return '<p>Кадет, кто-то захватил управление над наши кораблем! Он летит к минному полю!</p>'
				+ '<p>Используйте все знания, которые вы приобрели, чтобы исправить ситуацию.</p>'
				+ '<p>Черт, мы не можем отсановить обработку кода, у нас мало времени.</p>';

		},
		// Список команд задан в панели инструкций
		instructions:       '<ul>' +
							'<li>У вас мало времени. По расчетам BBot\'а осталось 30 секунд.</li>' +
							'<li><span class="red-label">transport.moveForward()</span> - полет вперед.</li>' +
							'<li><span class="red-label">transport.rotateLeft()</span> - поворот влево.</li>' +
							'<li><span class="red-label">transport.rotateRight()</span> - поворот вправо.</li>' +
							'</ul>',
		character:          [{
			audio:  'audio/lesson1/3.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Редактор кода',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			],
			marker: {
				x1:   6,
				y2:   Infinity,
				type: 'line'
			}
		}],
		gameHandler: function (transport) {

			var botText = BBotText({

				failed: '<p>О нет, наш корабль уничтожили.</p>' +
						'<p>Что ж одним больше, другим меньше!</p>',

				correct: '<p>Ура! Корабль спасен!</p>' +
						 '<p>Hasta la vista, baby!</p>',

				text: '<p>Хьюстон, у нас проблема!</p>' +
					  '<p>Осталось мало времени: ' + Math.floor(delta % 60) + '!</p>'

			});

			if (time) {

				time = Date.now();

			} else {

				// Разница между текущим и записаным
				var delta = time - Date.now();

				// Если дельта больше 30 секунд
				if (delta > 30000) {

					return botText.resultCorrect();

				}

			}

			// Если код не запущен,
			// то выполняем запуск.
			if (!CodeLauncher.isCodeRunning) {

				CodeLauncher.run();

			}

		}

	};

}
