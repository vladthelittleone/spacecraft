'use strict';

angular.module('spacecraft.errorBoard', [])
    .directive('errorBoard', ['$injector', function ($injector)
    {
        var link = function (scope)
        {
            scope.$watch('editorParams.error', function (n)
            {
                scope.error = n;
            });

            scope.closeErrorList = function()
            {
                scope.editorParams.error = false;
            };
        };

        return {
            scope: {
                editorParams: '='
            },
            templateUrl: 'views/errorboard.html',
            link: link
        };
    }]);
