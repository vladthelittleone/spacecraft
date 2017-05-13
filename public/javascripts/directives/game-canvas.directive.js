'use strict';

/**
 * Зависимости
 */
var Game = require('../game');
var spinnerMessages = require('./../utils/json/messages/spinner.json');

GameCanvas.$inject=['$stateParams', 'spinner'];

module.exports = GameCanvas;

/**
 * Директива инициализации игрового контента.
 */
function GameCanvas($stateParams, spinner) {

	var directive = {
		scope:       {
			hideDhs: '=' // Показывать параметры
		},
		templateUrl: 'views/directives/game-canvas.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		// Стартует спиннер, как показатель факта загрузки игры.
		spinner.start({message: spinnerMessages.game, delay: 0});

		Game.initialization($stateParams.id, afterGameInitialization);

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

		function afterGameInitialization() {

			spinner.stop();

			$scope.world = Game.world.getWorld();

		}

	}

}
