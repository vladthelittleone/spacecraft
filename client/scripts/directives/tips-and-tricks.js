/**
 * Created by vladthelittleone on 10.11.15.
 */
angular.module('spacecraft.tipsAndTricks', [])
    .directive('tipsAndTricks', ['$injector', function ()
    {
        var link = function (scope)
        {

        };

        return {
            scope: {
            },
            templateUrl: 'views/tips-and-tricks.html',
            link: link
        };
    }]);
