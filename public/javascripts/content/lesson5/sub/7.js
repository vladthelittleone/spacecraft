'use strict';

var LessonResults = require('../../lesson-results');

module.exports = OperatorMod();

/**
 * Урок - 'Догнать за 64 секунды';
 */
function OperatorMod() {

	return {
		isRestartDisabled:  true,
		title:              'На 98% безопасней обычного деления',
		content:            content,
		character:          [],
		interpreterHandler: interpreterHandler,
		instructions:       '<ul>' +
							'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку ' +
							'<i class="glyphicon glyphicon-play green"></i>.</li>' +
							'<li>Крупица знаний: ' +
							'<a target="_blank" href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Остаток_от_деления_()">забрать</a>.</li>' +
							'</ul>'
	};

	function content() {

		return '<p>Оператор <strong class="under-label">%</strong>, несмотря на его темное прошлое в математике, ' +
			'не имеет никакого отношения к процентам. В результате выполнения этого оператора, ' +
			'мы получаем остаток от деления одного числа на другое. Например:</p>' +
			'<pre>150 % 100 // 50 </pre> ' +
			'<p>Исследователи академии заметили небольшую особенность при использовании этого оператора ' +
			'для положительных чисел: если значение делителя больше делимого, то результатом выполнения оператора ' +
			'<strong class="under-label">%</strong> будет само делимое.</p>';

	}

	function interpreterHandler(value) {

		var lessonResults = {

			correct: '<p>Кадет, еще не уснул? Тогда выполняю:</p>' +
					 '<p class="bbot-output">{{correctText}}</p>',

			unknownError: '<p>Чт0 здесь вообще прои3ошло?</p>'

		};

		return LessonResults(lessonResults)
			.resultsWrapper(value);
	}
}
