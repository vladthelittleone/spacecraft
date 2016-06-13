'use strict';

/**
 * Зависимости
 */
var Game = require('../game');

GameCanvas.$inject = ['$stateParams'];

module.exports = GameCanvas;

/**
 * Директива инициализации игрового контента.
 */
function GameCanvas($stateParams) {

	var directive = {
		scope:       {
			editorOptions: '='
		},
		templateUrl: 'views/directives/game-canvas.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		var game = Game($stateParams.id);

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

			game.destroy(); // Очистка игры при удалении

		}

	}

}
