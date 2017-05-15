'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');
var CodeLauncher = require('../../../game/launcher');

module.exports = ifOperation();

var lodash = require('lodash');

/**
 * Created by vaimer on 09.05.2017.
 */
function ifOperation() {

	return {
		isRestartDisabled: true,
		title:             'Уничтожать или не уничтожать?',
		character:         [{
			audio: 'audio/lesson2/1-1',
			css:   'astromen-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
			  '<li>Измените условие <strong>8</strong> строки на <span class="red-label">2 > 2</span>.</li>' +
			  '<li>Измените условие <strong>15</strong> строки на <span class="red-label">5 > 3</span>.</li>' +
			  '</ul>',

		instructions: '<ul>' +
					  '<li>Изучите комментарии к коду.</li>' +
					  '<li>Измените условие так, чтобы корабль не был уничтожен.</li>' +
					  '<li>Измените условие так, чтобы BBot вывел сообщение о состоянии систем корабля.</li>' +
					  '<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
					  '</ul>'
	};

	function gamePostUpdate(shuttle,
							lesson,
							player,
							text) {

		var lessonResults = LessonResults({

											  correct: '<p>Где правда проступает сквозb туман,</p>' +
													   '<p>там терпит поражение 0бман....</p>' +
													   '<p>Ой, что это я. Транслирую:</p>' +
													   '<p class="bbot-output">Health: 10 </br>State: OK</p>',

											  unknownError: '<p>Что-то не так! Не могу найти заданный выв0д!</p>' +
															'<p>Внимательно про4итайте инструкции и попробуйте снова.</p>',

											  text: '<p>Создаю резервную копию.</p> ' +
													'<p>Уничтожение системы через 3.. 2.. 1..</p>  ' +
													'<p>Восстанавливаю системY из резервной копии.</p> ' +
													'<p>Не делайте так больше. Ты разбиваешb мое металлическое сердце!</p>'
										  });

		if (shuttle.isAlive()) {

			return lessonResults.resultCorrect();

		} else {

			CodeLauncher.stop();

			return lessonResults.text();
		}
	}

	function content() {

		return '<p>Здравствуйте, кадет. В космосе бывают ситуации, когда, в зависимости от условий, ' +
			'необходимо выполнять определенные действия или принимать сложные решения.</p>' +
			'<p>Для этого был создан оператор <strong class=‘under-lable’>if</strong>, ' +
			'который позволяет определить условное выражение, возвращающее логический тип данных - <strong>boolean</strong>:</p>' +
			'<pre>if (<strong>условие</strong>) {\n' +
			'  <strong>действия</strong> \n' +
			'}</pre>' +
			'<p>Если <strong>условие</strong> имеет значение <strong class=’under-lable’>true</strong> - "истина", то выполнятся заданные <strong>действия</strong>.</p>' +
			'<p>Смоделируем ситуацию: хитрый взломщик решил уничтожить корабль, изменив код модуля защиты. Ваша задача не допустить этого!</p>';

	}
}
