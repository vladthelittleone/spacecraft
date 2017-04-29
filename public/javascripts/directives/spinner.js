'use strict';

Spinner.$inject = ['$rootScope'];

module.exports = Spinner;

/**
 * @author iretd
 * @since 29.04.2017
 */
function Spinner($rootScope) {

	var directive = {
		templateUrl: 'views/directives/spinner.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope, element) {

		$rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute) {

			if (previousRoute) return;

			$timeout(function() {
				element.removeClass('ng-hide');
			});

		});

		$rootScope.$on('$stateChangeSuccess', function() {
			element.addClass('ng-hide');
		});

	}
}
