'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
angular.module('spacecraft.gameCanvas', [])
    .directive('gameCanvas', function ()
    {
        var linkFn = function (scope)
        {
			var game = SpaceCraftGame({scope: scope});

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
            templateUrl: 'views/game.html',
            link: linkFn
        };

    });
