angular.module('spacecraft')
    .directive('errorBoard', ['$injector', function ($injector)
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
            templateUrl: 'views/errorboard.html',
            link: link
        };
    }]);
