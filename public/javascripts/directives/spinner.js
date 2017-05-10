'use strict';

Spinner.$inject = ['$rootScope', '$timeout'];

var lodash = require('lodash');

module.exports = Spinner;

/**
 * Логика срабатывания спиннера опирается на наличие событий $stateChangeStart и $stateChangeSuccess.
 * Модуль ngRoute посредством сигнала события $stateChangeStart сообщает нам о том, что пользователь
 * переходит на другое состояние. В этот момент, начинаем показ спиннера.
 * Событие $stateChangeSuccess от ngRoute сообщает о том, что переход на состояние успешно завершено.
 * Останавливаем показ спиннера в этот момент.
 *
 * Для явной просьбы старта/останова спиннера, со стороны пользовательского кода, введено прослушивание событий:
 * - startSpinnerForcibly;
 * - stopSpinnerForcibly.
 * Обработчик события startSpinnerForcibly ожидает текст сообщения,
 * которое затем необходимо отобразить под спиннером (без такой необходимости, сообщение можно опустить).
 *
 * @author iretd
 * @since 29.04.2017
 */
function Spinner($rootScope, $timeout) {

	var visible = false;

	// MILLISECONDS
	var DEFAULT_DELAY = 1000;
	var DEFAULT_SPINNER_MESSAGE = 'Загрузка...';

	var directive = {
		templateUrl: 'views/directives/spinner.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope, element) {

		$rootScope.$on('setSpinnerMessage', function (event, message) {

			updateSpinnerState({message: message});

		});

		// startSpinnerForcibly - событие, на которое в сию секунду осуществляется показ спинера.
		// На случай, когда какой-либо код требует показ спинера.
		$rootScope.$on('startSpinnerForcibly', function (event, args) {

			// Если спиннер уже отображается, то обновляем только сообщение.
			if (visible) {

				updateSpinnerState({message: args.message});

			} else {

				updateSpinnerState({
									   visible: true,
									   message: args.message,
									   delay:   lodash.isNil(args.delay) ? DEFAULT_DELAY : args.delay
								   });

			}

		});

		// stopSpinnerForcibly - событие, на которое в сию секунду прекращается показ спинера.
		$rootScope.$on('stopSpinnerForcibly', function () {

			updateSpinnerState({visible: false});

		});

		$rootScope.$on('$stateChangeStart', function () {

			updateSpinnerState({visible: true, delay: DEFAULT_DELAY});

		});

		$rootScope.$on('$stateChangeSuccess', function () {

			updateSpinnerState({visible: false});

		});

		updateSpinnerState({visible: false});

		// Общий метод обновления состояния спиннера.
		// Ожидает на вход объект с возможными параметрами:
		// - visible - флаг показа спиннера;
		// - message - сообщение, которое будет подписано под спиннером;
		// - delay - задержка, с которой будет осуществлен показ спиннера.
		function updateSpinnerState(args) {

			setMessage(args.message);

			// Если определили свойство visible, значит хотим управлять состоянием видимости спиннера.
			if (!lodash.isNil(args.visible)) {

				visible = args.visible;

				if (visible) {

					if (!lodash.isNil(args.delay)) {

						$timeout(updateSpinnerVisibleState, args.delay);

						return;

					}
				}

				updateSpinnerVisibleState(visible);

			}

		}

		// Обновление состояния видимости спиннера вынесено в отдельный метод с целью
		// улучшения читабельности кода, который пользуется этой логикой.
		function updateSpinnerVisibleState() {

			if (visible) {

				element.removeClass('ng-hide');

			} else {

				element.addClass('ng-hide');

			}

		}

		// Обновление сообщения под спиннером вынесено в отдельный метод с целью
		// улучшения читабельности кода, который пользуется этой логикой.
		function setMessage(message) {

			scope.message = lodash.isNil(message) ? DEFAULT_SPINNER_MESSAGE : message;

		}

	}
}
