'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');
var DiagramHelp = require('../../diagram.help');

var rhombus = DiagramHelp.createRhombus;
var block = DiagramHelp.block;
var createLink = DiagramHelp.createLinkWithSourceCoordinate;

module.exports = ElseOperation();

var lodash = require('lodash');

/**
 * Created by vaimer on 20.05.2017.
 */
function ElseOperation() {

	return {
		isRestartDisabled: true,
		title:             'Условия, условия… А как иначе?',
		character:         [{
			audio: 'audio/lesson2/1-1',
			css:   'astromen-img',
			diagram: function (graph) {

				var condition = rhombus({
					x:           300,
					y:           50,
					width:       150,
					height:      100,
					text:        '3<=3',
					colorFill:   '#fe854f',
					colorStroke: '#152b39'
				});

				var act1 = block(50, 80, "setOwner('BBot')", '#152B39');
				var act2 = block(550, 80, "setOwner('Кадет')", '#152B39');
				var link1 = createLink(310, 100, act1);
				var link2 = createLink(410, 100, act2);

				graph.addCells([
					condition,
					act1,
					act2
				]);

				link1.addTo(graph);
				link1.toBack();
				link2.addTo(graph);
				link2.toBack();
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
		'<li>Измените условие <strong>8</strong> строки на <span class="red-label">5 < 2</span>.</li>' +
		'</ul>',

		instructions: '<ul>' +
		'<li>Изучите комментарии к коду.</li>' +
		'<li>Изменить условие так, чтобы система не была передана под управление BBot\'у.</li>' +
		'<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
		'</ul>'
	};

	function gamePostUpdate(corvette,
							statistics,
							player,
							text) {

		var lessonResults = LessonResults({

			correct: '<p>Ну и ладно!</p>' +
			'<p>У мен9 будет свой космический кораблb с блекджеком и микросхемами.</p>',

			unknownError: '<p>Что-то не так! Корабль же должен кому-то принадлежать!</p>' +
			'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			text: '<p>Ура! Теперь я главный и буду управлятb этим кораблем.</p> ' +
			'<p>Даю тебе шанс все исправить чил0ик!</p>'
		});

		if (corvette.isTrueCaptain()) {

			return lessonResults.resultCorrect('bbot-angry');

		} else {

			return lessonResults.text();

		}
	}

	function content() {

		return '<p>Если условие в блоке if приняло значение «false», то выполняется код в необязательном блоке <strong>else</strong>:</p>' +
			'<pre>if (<strong>условие</strong>)<br>' +
			'{<br>' +
			'    <strong>блок if</strong><br>' +
			'}<br>' +
			'else<br>' +
			'{<br>' +
			'    <strong>блок else</strong><br>' +
			'}</pre>' +
			'<p>Заметим, что <strong>if</strong> может существовать и без <strong>else</strong>, но не наоборот.</p>' +
			'<p>Вам все понятно? Тогда перейдем к заданию: нужно решить проблему с ограничением контроля <strong>BBot\'а</strong>. ' +
			'Этот хитрец решил попроказничать и взять под управление наш корабль. ' +
			'Не допустите этого!</p>';

	}
}
