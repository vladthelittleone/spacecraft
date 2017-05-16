'use strict';

/**
 * Модуль, с целью лакончиности объема кода в модулях resolve всех состояния,
 * экспорирует имена и значения ОБЩИХ (для resolve модулей нескольких состояний) resolve'ов.
 *
 * К примеру, resolve статуса авторизации необходим в модулях: welcome.resolve, lesson.resolve и lessons.resolve.
 * Поэтому, дабы избежать дублирования в определении одного и того же resolve'а, оно вынесено в этот
 * модуль.
 * Resolve'ы, которые в последующем будут дублироваться в нескольких модулях, также следует выносить в этот модуль!
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

var spinnerMessages = require('./../json/messages/spinner.json');

module.exports = function() {

	// Имена resolve'ов.
	var names = {
		authentication: 'authenticationStatus'
	};

	// Занчения resolve'ов
	var resolves = {};

	resolves[names.authentication] = ['promises', 'spinner', onAuthenticationStatus];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

	function onAuthenticationStatus (promises, spinner) {

		spinner.start({message: spinnerMessages.authorization});

		return promises.getAuthenticationStatus();

	}

}();
