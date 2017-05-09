'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = ifOperation();

var lodash = require('lodash');

/**
 * Created by vaimer on 09.05.2017.
 */

function ifOperation() {

	return {
		isRestartDisabled: true,
		title:        'Уничтожать или не уничтожать?',
		character:    [{
			audio:  'audio/lesson2/1-1.mp3',
			css:    'astromen-img'
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
		'<li>Добавьте <span class="red-label">researchContainer = harvester.cargoUnload();</span> на <strong>11</strong> строку.</li>' +

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
			'<p class="bbot-output">{{ПАРАМЕТРЫ: например координаты и hp}}</p>',

			unknownError: '<p>Что-то не так! Не могу найти заданный выв0д!</p>' +
			'<p>Внимательно про4итайте инструкции и попробуйте снова.</p>',

			removeSystem: '<p>Создаю резервную копию.</p> + ' +
			'<p>Уничтожение системы через 3.. 2.. 1..</p> + ' +
			'<p>Восстанавливаю системY из резервной копии.</p> +' +
			'<p>Не делайте так больше. Ты разбиваешb мое металлическое сердце!</p>'
		});

		return lessonResults.resultCorrect();

	}

	function content() {

		return  '<p>Здравствуйте, кадет. В космосе бывают ситуации, когда, в зависимости от условий, ' +
			'необходимо выполнять определенные действия или принимать сложные решения.</p>' +
			'<p>Для этого был создан оператор <strong class=‘under-lable’>if</strong>, ' +
			'который позволяет определить условное выражение, возвращающее логический тип данных - <strong>boolean</strong>:</p>' +
			'<pre> if ( условие ) ' +
			'{ ' +
			'		действия ' +
			'}</pre>' +
			'<p>Если <strong>условие</strong> имеет значение <strong class=’under-lable’>true</strong> - "истина", то выполнятся заданные <strong>действия</strong>.</p>' +
			'<p>Смоделируем ситуацию: хитрый взломщик решил уничтожить корабль, изменив код модуля защиты. Ваша задача не допустить этого!</p>';

	}
}
