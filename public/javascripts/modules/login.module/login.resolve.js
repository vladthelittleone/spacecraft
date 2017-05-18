'use strict';

/**
 * Модуль экспортирует имена и значения resolve'ов состояния 'login'.
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

var spinnerMessages = require('./../../utils/json/messages/spinner.json');

module.exports = LessonsResolve();

function LessonsResolve() {

	// Имена resolve'ов.
	var names = {
		authentication: 'authenticationStatus'
	};

	// Значения resolve'ов
	var resolves = {};

	resolves[names.authentication] = ['promises', 'spinner', onAuthenticationStatus];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

	function onAuthenticationStatus(promises, spinner) {

		spinner.start({message: spinnerMessages.authorization});

		return promises.getAuthenticationStatus({
													resolveAlways:    true,
													ignoreAuthModule: true
												});

	}

}
