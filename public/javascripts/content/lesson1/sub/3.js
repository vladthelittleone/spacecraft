'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');

module.exports = Command();

/**
 * Урок - 'Команды'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Command() {

	return {
		title:        'Команды',
		content:      function () {

			return '<p>Команды - это инструкции раздеяемые точкой с запятой, с помощью которых вы можете управлять кораблем и не только.</p>' +
				'<p>Команды сканируются слева направо, сверху вниз.</p>' +
				'<p>Вы уже знаете команду поворота влево: <pre>transport.rotateLeft();</pre></p>' +
				'<p>Давайте попробуем добавить новую, ранее не изученную.</p>'

		},
		instructions: '<ul>' +
					  '<li><span class="red-label">transport.moveForward()</span> - команда, направляющая корабль вперед.</li>' +
					  '<li>Добавте команду <span class="red-label">transport.moveForward()</span> на <strong>11</strong> строку.</li>' +
					  '<li>Не забудьте про точку с запятой.</li>' +
					  '</ul>',
		hint:         '<ul>' +
					  '<li>Вы можете воспользоваться автодополнением, нажав <span class="under-label-gray">Space + Alt</span>.</li>' +
					  '<li>Если нажать <span class="under-label-gray">Space + Alt</span> после <span class="under-label-gray">transport.</span>, появятся все доступные методы корабля.</li>' +
					  '</ul>',
		character:    [{
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
		gamePostUpdate:  function (spaceCraft) {

			var botText = BBotText({
				correct: '<p>Осуществляю подачу топлива!</p>' +
						 '<p>3апускаю двигатели!</p>' +
						 '<p>ПОЕХАЛИ!</p>'
			});

			if (spaceCraft.isMoveForwardCalled()) {

				return botText.resultCorrect();

			}

		}
	};
}
