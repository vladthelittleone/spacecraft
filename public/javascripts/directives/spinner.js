'use strict';

Spinner.$inject = ['$rootScope', '$http'];

module.exports = Spinner;

/**
 * @author iretd
 * @since 29.04.2017
 */
function Spinner($rootScope, $http) {

	var directive = {
		templateUrl: 'views/directives/spinner.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link(scope, element) {

		// element.addClass('ng-hide');

		scope.isLoading = function () {

			return $http.pendingRequests.length > 0;

		};

		scope.$watch(scope.isLoading, function (value) {

			if (value) {

				element.removeClass('ng-hide');

			} else {

				element.addClass('ng-hide');
				
			}

		});

		// $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute) {
        //
		// 	element.removeClass('ng-hide');
        //
		// });
        //
		// $rootScope.$on('$stateChangeSuccess', function() {
		// 	element.addClass('ng-hide');
		// });

	}
}
