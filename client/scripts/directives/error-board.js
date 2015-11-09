angular.module('spacecraft.errorBoard', [])
    .directive('errorBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            var error;

            scope.$watch('error', function (n)
            {
                error = n;
            });

            scope.closeErrorList = function()
            {
                scope.error = false;
            };
        };

        return {
            scope: {
                error: '='
            },
            templateUrl: 'views/errorboard.html',
            link: link
        };
    }]);
