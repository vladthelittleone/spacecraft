/**
 * Created by Ivan on 24.10.2015.
 */

angular.module('spacecraft')
    .directive('leadBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            var spaceCraft;

            scope.$watch('spaceCraft', function (n)
            {
                spaceCraft = n;
            });
        };

        return {
            scope: {
                spaceCraft: '='
            },
            templateUrl: 'views/leadBoard.html',
            link: link
        };
    }])
;