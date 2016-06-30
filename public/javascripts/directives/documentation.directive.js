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

		// Переклчатель документации
		$scope.openFunctionDoc = functionDocOpen;

		// Наблюдение за параметром hide.
		// В случае изменения
		$scope.$watch('hide', onHide);

		// ==================================================

		function functionDocOpen(v) {

			$scope.doc = documentation[v];

			$scope.functionDocOpen = true;

		}

		function onHide() {

			// Закрываем вкладку функций.
			$scope.functionDocOpen = false;

		}
	}
}
