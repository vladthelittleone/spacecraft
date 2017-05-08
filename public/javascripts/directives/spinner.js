'use strict';

Spinner.$inject = ['$rootScope', '$timeout'];

var lodash = require('lodash');

module.exports = Spinner;

/**
 * @author iretd
 * @since 29.04.2017
 */
function Spinner($rootScope, $timeout) {

	var visible = false;

	// MILLISECONDS
	var TIME_TILL_SPINNER_VISIBLE = 500;

	var directive = {
		templateUrl: 'views/directives/spinner.html',
		scope: {
			message: '='
		},
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope, element) {

		if (lodash.isNil(scope.message)) {

			scope.message = 'Загрузка';

		}

		updateSpinnerVisibleState();

		$rootScope.$on('$stateChangeStart', function() {

			visible = true;

			$timeout(updateSpinnerVisibleState, TIME_TILL_SPINNER_VISIBLE);

		});

		$rootScope.$on('$stateChangeSuccess', function() {

			visible = false;

			$timeout(updateSpinnerVisibleState, TIME_TILL_SPINNER_VISIBLE);

		});

		function updateSpinnerVisibleState() {

			if (visible) {

				element.removeClass('ng-hide');

			} else {

				element.addClass('ng-hide');

			}

		}

	}
}
