'use strict';

/**
 * Модуль экспортирует имена и значения resolve'ов состояния 'lessons'.
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

module.exports = LessonsResolve();

function LessonsResolve() {

	// Имена resolve'ов.
	var names = {
		authentication: otherResolves.names.authentication
	};

	// Значения resolve'ов
	var resolves = {};

	resolves[names.authentication] = otherResolves.values[names.authentication];

	// В качестве экспорта из модуля:
	var t = {};

	t.names = names;
	t.values = resolves;

	return t;

}
