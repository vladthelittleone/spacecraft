'use strict';

var spinnerMessages = require('./../../utils/json/messages/spinner.json');

module.exports = LessonResolve();

/**
 * Модуль экспортирует имена и значения resolve'ов состояния 'lesson'.
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
function LessonResolve() {

	// Имена resolve'ов.
	var names = {
		authentication: 'authenticationStatus',
		lessonStatistics: 'lessonStatistics',
		game:           'game'
	};

	// Значения resolve'ов
	var resolves = {};

	resolves[names.authentication] = ['promises', 'spinner', onAuthenticationStatus];
	resolves[names.lessonStatistics] = ['promises', 'spinner', names.authentication, onLessonStatistics];
	resolves[names.game] = ['$stateParams', 'promises', 'spinner', 'lessonService', names.lessonStatistics, onGame];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

	function onAuthenticationStatus(promises, spinner) {

		spinner.start({message: spinnerMessages.authorization});

		return promises.getAuthenticationStatus();

	}

	function onLessonStatistics(promises, spinner) {

		spinner.start({message: spinnerMessages.lessonStatistics});

		return promises.getLessonStatisticsData();

	}

	function onGame($stateParams, promises, spinner, lessonService, lessonStatistics) {

		spinner.start({message: spinnerMessages.game, delay: 0});

		lessonService.onLessonStatisticsLoad(lessonStatistics);

		return promises.getGame($stateParams.id);

	}

}
