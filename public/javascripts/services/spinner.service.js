'use strict';

Spinner.$inject = ['$rootScope', '$state'];

var lodash = require('lodash');

module.exports = Spinner;

/**
 * Сервис спиннера введен с целью инкапсуляции реализации его показа/скрытия, а также обновления
 * сообщения под спиннера.
 *
 * В местах кода, где требуется управлять состоянием спиннера, можно использовать данный сервис.
 *
 * @since 10.05.17
 * @author iretd
 */

function Spinner($rootScope, $state) {

	var t = {};

	t.start = start;
	t.stop = stop;
	t.setMessage = setMessage;

	return t;

	function start(args) {

		if (lodash.isNil(args.delay)) {

			// Если определен ТЕКУЩИЙ state (т.е. пользователь располагается на каком-то state'e),
			// то вносим delay в 1000 мс (пользователю нет необходимости показывать спиннера сразу).
			// В противном случае, delay не определяем (пользователь должен увидеть сразу).
			// Ситуация, когда текущий state не определен, возможна тогда, когда пользователь ВПЕРВЫЕ
			// входит на сайт.
			args.delay = $state.current.name ? 1000 : 0;

		}

		$rootScope.$emit('startSpinnerForcibly', args);

	}

	function stop() {

		$rootScope.$emit('stopSpinnerForcibly');

	}

	function setMessage(message) {

		$rootScope.$emit('setSpinnerMessage', message);

	}

}
