'use strict';

module.exports = Documentation;

/**
 * Директива контроля доски документации.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function Documentation() {

	var directive = {
		scope:       {
			hide: '='
		},
		templateUrl: 'views/directives/documentation.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		// Данные по функциям и объектам
		$scope.doc = {};

		// Открыта ли на текущий момент
		// вкладка функций.
		$scope.functionDocOpen = false;

		$scope.openFunctionDoc = function (v) {

			$scope.doc = documentation[v];

			$scope.functionDocOpen = true;

		};

		// Наблюдение за параметром hide.
		// В случае изменения
		$scope.$watch('hide', function () {

			// Закрываем вкладку функций.
			$scope.functionDocOpen = false;

		});
	}
}
