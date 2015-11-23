'use strict';

/**
 * Created by Ivan on 24.10.2015.
 */

angular.module('spacecraft.leadBoard', [])
    .directive('leadBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            var player;

            VK.Widgets.Subscribe("vk_subscribe", {mode: 1}, -105816682);

            scope.$watch('player', function (n)
            {
                player = n;
            });

            scope.reload = function ()
            {
                window.location.reload(true);
            };
        };

        return {
            scope: {
                player: '='
            },
            templateUrl: 'views/leadboard.html',
            link: link
        };
    }])
;
