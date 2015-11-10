'use strict';

/**
 * Created by Ivan on 24.10.2015.
 */
angular.module('spacecraft')
    .directive('leadBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            var spaceCraft;

            VK.Widgets.Subscribe("vk_subscribe", {mode: 1}, -105816682);

            scope.$watch('spaceCraft', function (n)
            {
                spaceCraft = n;
            });

            scope.reload = function ()
            {
                window.location.reload(true);
            };
        };

        return {
            scope: {
                spaceCraft: '='
            },
            templateUrl: 'views/leadboard.html',
            link: link
        };
    }])
;
