'use strict';

/**
 * Зависимости
 */
var Game = require('../../game');

module.exports = GameCanvas;

/**
 * Директива инициализации игрового контента.
 */
function GameCanvas() {

	var directive = {
		scope:       {
			hideDhs: '=' // Показывать параметры
		},
		templateUrl: 'views/directives/shared/game-canvas.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.world = Game.world;
		$scope.fillArray = fillArray;
		$scope.$on('$destroy', onDestroy);

		// ==================================================

		/**
		 * Возврашает заполненый массив, заданного размера.
		 * Используется для ng-repeat.
		 *
		 * @param num размер массив
		 */
		function fillArray(num) {

			var arr = [];

			for (var i = 0; i < num; i++) {

				arr.push(i);

			}

			return arr;

		}

		function onDestroy() {

			Game.destroy(); // Очистка игры при удалении

		}

	}

}
