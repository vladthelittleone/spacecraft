'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
var app = angular.module('spacecraft.gameCanvas', []);

app.directive('gameCanvas', ['statistics', '$state', function (statistics, $state)
{
	var linkFn = function (scope)
	{
		/**
		 * Выполняется при уничтожение корабля.
		 * @param player
		 */
		var resultCall = function (player)
		{
			statistics.setPlayer(player);
			$state.go('result');
		};

		var game = SpaceCraftGame({
			scope: scope,
			callers:
			{
				result: resultCall
			}
		});

		//===================================
		//============== SCOPE ==============
		//===================================

		scope.getNumber = function(num)
		{
			var arr = [];

			for (var i = 0; i < num; i++)
			{
				arr.push(i);
			}

			return arr;
		};

		scope.$on('$destroy', function()
		{
			game.destroy(); // Clean up the game when we leave this scope
		});
	};

	return {
		scope:
		{
			editorParams: '=',
			player: '='
		},
		templateUrl: 'views/game-canvas.html',
		link: linkFn
	};

}]);
