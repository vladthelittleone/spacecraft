/**
 * Created by Ivan on 24.10.2015.
 */

angular.module('spacecraft')
    .directive('leadBoard', ['$injector', function ($injector)
    {
        var linkLB = function (scope)
        {

        };

        return {
            scope: {
            },
            templateUrl: 'views/leadBoard.html',
            link: linkLB
        };
    }])
;