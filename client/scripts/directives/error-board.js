'use strict';

angular.module('spacecraft.errorBoard', [])
    .directive('errorBoard', function ()
    {
        var link = function (scope)
        {
            scope.closeErrorList = function()
            {
                scope.editorParams.error = false;
            };
        };

        return {
            scope: {
                editorParams: '='
            },
            templateUrl: 'views/error-board.html',
            link: link
        };
    });
