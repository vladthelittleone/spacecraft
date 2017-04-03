'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = Command();

/**
 * Урок - 'Команды'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Command() {

	return {
		title:          'Команды',
		content:        content,
		instructions:   '<ul>' +
						'<li><span class="red-label">transport.moveForward()</span> - команда, направляющая корабль вперед.</li>' +
						'<li>Добавте команду <span class="red-label">transport.moveForward()</span> на <strong>11</strong> строку.</li>' +
						'<li>Не забудьте про точку с запятой.</li>' +
						'</ul>',
		hint:           '<ul>' +
						'<li>Вы можете воспользоваться автодополнением, нажав <span class="under-label-gray">Space + Alt</span>.</li>' +
						'<li>Если нажать <span class="under-label-gray">Space + Alt</span> после <span class="under-label-gray">transport.</span>, появятся все доступные методы корабля.</li>' +
						'</ul>',
		character:      [{
			audio:  'audio/lesson2/3-1',
			css:    'astromen-img'
		},{
			audio:  'audio/lesson2/3-2',
			css:    'astromen-img',
			marker: {
				x1:   8,
				y2:   Infinity
			}
		},{
			audio:  'audio/lesson2/3-3',
			css:    'astromen-img',
			marker: {
				x1:   11,
				y2:   Infinity
			}

		},{
			audio:  'audio/lesson2/3-4',
			css:    'astrogirl-img',
			hint:        [{
				'click .lesson-alt-hint': 'Нажмите для получения инструкций',
				'nextButton':             false,
				'showSkip':               false
			}]

		}],
		gamePostUpdate: gamePostUpdate
	};

	function gamePostUpdate(spaceCraft) {

		var lessonResults = LessonResults({
			correct: '<p>Осуществляю подачу топлива!</p>' +
					 '<p>3апускаю двигатели!</p>' +
					 '<p>ПОЕХАЛИ!</p>'
		});

		if (spaceCraft.isMoveForwardCalled()) {

			return lessonResults.resultCorrect();

		}

	}

	function content() {

		return '<p>Команды - это инструкции разделяемые точкой с запятой, с помощью которых вы можете управлять кораблем и не только.</p>' +
			'<p>Команды сканируются слева направо, сверху вниз.</p>' +
			'<p>Вы уже знаете команду поворота влево: <pre><strong>transport</strong>.rotateLeft();</pre></p>' +
			'<p>Давайте попробуем добавить новую, ранее не изученную.</p>'

	}
}
