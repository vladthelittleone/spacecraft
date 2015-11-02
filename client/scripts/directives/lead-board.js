/**
 * Created by Ivan on 24.10.2015.
 */

angular.module('spacecraft')
    .directive('leadBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            var spaceCraft;
            VK.Widgets.Group("vk_groups", {mode: 1, width: "auto", height: "100", color1: 'FFFFFF', color2: '2E3435', color3: '5B7FA6'}, 105816682);

            scope.$watch('spaceCraft', function (n)
            {
                spaceCraft = n;
            });
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
