'use strict';

/**
 * Зависимости
 */
var Game = require('../game');

/**
 * Директива инициализации игрового контента.
 */
function GameCanvas(statistics, $state, $stateParams) {

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

		var game = createGame();

		$scope.fillArray = fillArray;
		$scope.$on('$destroy', onDestroy);

		// ==================================================

		/**
		 * Callback, который выполняется при уничтожение корабля.
		 *
		 * @param player текущяя статистика игрока
		 */
		function resultCall(player) {

			statistics.setPlayer(player);

			$state.go('result');

		}

		/**
		 * Функция создания игры.
		 */
		function createGame() {

			var args = {
				scope:    $scope, 				// scope
				lessonId: $stateParams.id,     	// текущий урок
				callers:  {result: resultCall} 	// callback'и
			};

			return Game.createOnlineGame(args);

		}

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

GameCanvas.$inject = ['statistics', '$state', '$stateParams'];

module.exports = GameCanvas;
