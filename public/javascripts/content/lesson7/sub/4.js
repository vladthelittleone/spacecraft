'use strict';

// Зависимсоти
var LessonResults = require('../../lesson-results');

module.exports = ComplexLogicalExpressionOr();

var lodash = require('lodash');

/**
 * Created by vaimer on 20.05.2017.
 */
function ComplexLogicalExpressionOr() {

	var lessonTableColumns = ['||', 'true', 'false'];
	var lessonTableRows = [
				['<strong>true</strong>', 'true', 'true'],
				['<strong>false</strong>', 'true', 'false']
	];
	return {
		isRestartDisabled: true,
		title:             'Две палочки',
		character:         [{
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows
			}
		}, {
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [1, 2],
				hintRows: [0]
			}
		}, {
			audio: 'audio/lesson6/8-1',
			css:   'astromen-img',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [2],
				hintRows: [1]
			}
		}],

		gamePostUpdate: gamePostUpdate,

		content: content,

		hint: '<ul>' +
		'<li>Измените значение переменной <strong>isLaser1Ready</strong> на <span class="under-label">true</span>.</li>' +
		'</ul>',

		instructions: '<ul>' +
		'<li>Изучите комментарии к коду.</li>' +
		'<li>Сделайте так, чтобы условие на 13 строчке было истинным.</li>' +
		'</ul>'
	};

	function gamePostUpdate(corvette) {

		var lessonResults = LessonResults({

			correct: '<p>На оружие полагаешься, но оружием нельзя выиграть сражение. </p>' +
			'<p>Разум твой всего сильнее.</p>',

			unknownError: '<p>Что-то не так! Оружие не прошло проверку!</p>' +
			'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

			text: '<p>Вдарим рок в этой дыре!.</p> '
		});

		if (corvette.isUseFire()) {

			return lessonResults.resultCorrect();

		}

		return lessonResults.text();

	}

	function content() {

		return '<p>Управления космическим кораблем непростая задача. Постоянно от пилота требуется следить и проверять несколько факторов подряд.</p>' +
			'<p>В таких случаях используются логические операторы. Рассмотрим один из них.</p>' +
			'<p>Логический оператор || (или) возвращает «true», если один или оба операнда возвращают «true», иначе возвращает «false». </p>' +
			'<p>Но в языке программирования JavaScript не все так просто, об этом вы узнаете в следующих уроках. </p>' +
			'<pre> ' +
			'result = op1 || op2' +
			'</pre>' +
			'<p>Мы поставили датчик, аналогичный тому, который использовался при инциденте захвата корабля. Попробуйте уничтожить его..</p>';

	}
}
