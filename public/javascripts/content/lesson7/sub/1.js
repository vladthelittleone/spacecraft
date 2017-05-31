'use strict';

var LessonResults = require('../../lesson-results');
var CodeLauncher = require('../../../game/launcher');

module.exports = Drill();

var lodash = require('lodash');

/**
 * Created by vaimer on 18.05.17.
 */
function Drill() {

	return {
		isRestartDisabled: true,
		title:             'Учебная тревога.',
		character:         [{
			audio: 'audio/lesson2/1-1',
			css:   'astromen-img'
		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите «Далее» для продолжения.</li>' +
					  '</ul>'
	};


	function content() {

		return '<p>Здравствуйте, кадет. </p>' +
			'<p>Из-за всех этих взломов <strong>обсёрвы</strong> академии решили провести массовые ' +
			'учения с целью: не допустить утечку информации и захват кораблей.</p>' +
			'<p>Поэтому, сегодня вы здесь. </p>';

	}

	function defaultBBot() {

		return '<p>Обсёрвы - это людишки, кот0рые заправляют всем в академии.</p>' +
			'<p>Вроде как очень мудры, но это не Tочно.</p>';

	}
}
