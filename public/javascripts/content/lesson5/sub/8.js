'use strict';

var LessonResults = require('../../lesson-results');

module.exports = ConditionOperator();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function ConditionOperator() {

	var lessonTableColumns = ['Оператор', 'Описание', 'Примеры'];
	var lessonTableRows = [
			['<strong>==</strong>', 'Возвращает <strong>true</strong>, если операнды равны.', '3 == 3'],
			['<strong>!=</strong>', 'Возвращает <strong>true</strong>, если операнды не равны.', '3 != 4'],
			['<strong>===</strong>', 'Возвращает <strong>true</strong>, если операнды равны и имеют одинаковый тип.', '3 === \'3\''],
			['<strong>!==</strong>', 'Возвращает <strong>true</strong>, если операнды не равны и/или имеют разный тип.', '3 !== "3"'],
			['<strong>></strong>', 'Возвращает <strong>true</strong>, если операнд слева больше операнда справа.', '3 > 2'],
			['<strong>>=</strong>', 'Возвращает <strong>true</strong>, если операнд слева больше или равен операнду справа.', '5 >= 5'],
			['<strong><</strong>', 'Возвращает <strong>true</strong>, если операнд слева меньше операнда справа.', '2 < 3'],
			['<strong><=</strong>', 'Возвращает <strong>true</strong>, если операнд слева меньше или равен операнду справа.', '3 <= 3']];

	return {
		isRestartDisabled:  true,
		title:              'Все мы здесь сегодня…',
		content:            content,
		interpreterHandler: interpreterHandler,
		instructions:
		'<ul>' +
		'<li>Поменяйте в коде операторы и числа так, чтобы команда <red-label>BBotDebug</red-lable> выводила во всех случаях ' +
		'<span class="under-label">true</span>.</li>' +
		'<li>Все еще не понятно, тогда вам сюда: ' +
		'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators#Операторы_сравнения">клик</a>.</li></ul>',
		hint:
		'<ul>' +
		'<li>В <strong>3</strong> строке измените код на <span class="red-label">BBotDebug(3 === 3);</span></li>' +
		'<li>В <strong>7</strong> строке измените код на <span class="red-label">BBotDebug(6 > 4);</span></li>' +
		'<li>В <strong>8</strong> строке измените код на <span class="red-label">BBotDebug(2 !== 3);</span></li>' +
		'<li>В <strong>9</strong> строке измените код на <span class="red-label">BBotDebug(true);</span></li>' +
		'</ul>',
		character: [{
			audio: 'audio/lesson6/8-1',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
			}
		}, {
			audio: 'audio/lesson6/8-2',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [0],
				hintRows: [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}, {
			audio: 'audio/lesson6/8-3',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [1],
				hintRows: [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}, {
			audio: 'audio/lesson6/8-4',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
				hintColumns: [2],
				hintRows: [0, 1, 2, 3, 4, 5, 6, 7]
			}
		}, {
			audio: 'audio/lesson6/8-5',
			lessonTable: {
				columns: lessonTableColumns,
				rows: lessonTableRows,
			}
		}]
	};

	function content() {

		return '<p>В языке программирования <strong>JavaScript</strong> существует большое количество разнообразных операторов. ' +
			'Некоторые из них представлены в данной ' +
			'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators#Операторы_сравнения">таблице</a>.</p>' +
			'<p>В первом столбце таблицы вы можете увидеть непосредственно сами операторы.</p>' +
			'<p>Во втором - краткое описание оператора.</p> ' +
			'<p>В третьем столбце - приведен пример использования данного оператора.</p>';

	}

	function interpreterHandler (value) {

		var lessonResults = LessonResults({

		    correct: '<p>Испытание окончен0. Скушай т0ртик.</p>' +
					 '<p class="bbot-output">true</p>' +
					 '<p class="bbot-output">true</p>' +
					 '<p class="bbot-output">true</p>' +
					 '<p class="bbot-output">true</p>' +
					 '<p class="bbot-output">true</p>' +
					 '<p class="bbot-output">true</p>',
			unknownError: '<p>Все в норме? Моей колонии р0ботов нужны умные рабы. Шучу. ' +
			'Внимательней про4итайте инструкции и попробуйте снова.</p>'

		});

		var haveFalseStatement = true;

		if (Array.isArray(value)) {

			haveFalseStatement = value.some(function (currentValue) {

				return !currentValue;

			});

		}

		if (haveFalseStatement) {

			return lessonResults.unknownError();


		} else {

			return lessonResults.resultCorrect();

		}
	}
}
