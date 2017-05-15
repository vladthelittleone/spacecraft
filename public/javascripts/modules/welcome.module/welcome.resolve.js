'use strict';

/**
 * Модуль экспортирует имена и значения resolve'ов состояния 'welcome'.
 *
 * Формат экспорта модуля:
 * names - содержит ИМЕНА resolve'ов;
 * values - содержит ЗНАЧЕНИЯ resolve'ов.
 * Имена (names) экспортируются с целью отсылки на них во внешних модулях.
 * Значения (values) - это и есть сами resolve'ы. Они экспортируются с целью передачи их модулю ui-router.
 *
 * @since 13.05.17
 * @author iretd
 */

var otherResolves = require('./../../utils/helpers/resolves');
var spinnerMessages = require('./../../utils/json/messages/spinner.json');

module.exports = WelcomeResolve();

function WelcomeResolve() {

	// Имена resolve'ов.
	var names = {
		authentication: otherResolves.names.authentication,
		lessonStatistics: 'lessonStatisticsData',
		leaderBoard: 'leaderBoardData',
		userProgress: 'userProgressData',
		userInfo : 'userInfoData'
	};

	// Значения resolve'ов
	var resolves = {};

	resolves[names.authentication] = otherResolves.values[names.authentication];
	resolves[names.lessonStatistics] = ['promises', 'spinner', names.authentication, onLessons];
	resolves[names.leaderBoard] = ['promises', 'spinner', names.lessonStatistics, onLeaderBoard];
	resolves[names.userProgress] = ['promises', 'spinner', names.leaderBoard, onUserProgress];
	resolves[names.userInfo] = ['promises', 'spinner', names.userProgress, onUserInfo];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

	function onUserProgress(promises, spinner) {

		spinner.start({message: spinnerMessages.userProgress});

		return promises.getUserProgressData();

	}

	function onUserInfo (promises, spinner) {

		spinner.start({message: spinnerMessages.userInfo});

		return promises.getUserInfoData();

	}

	function onLessons (promises, spinner) {

		spinner.start({message: spinnerMessages.lessonStatistics});

		return promises.getLessonStatisticsData();

	}

	function onLeaderBoard(promises, spinner) {

		spinner.start({message: spinnerMessages.leaderBoard});

		return promises.getLeaderBoardData();

	}

}
