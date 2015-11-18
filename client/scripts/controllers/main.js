'use strict';

/**
 * @ngdoc function
 * @name spacecraft.controller:MainController
 * @description
 * # MainController
 * Controller of the spacecraft
 */
angular.module('spacecraft.main', [])
    .config(['$stateProvider', function ($stateProvider)
    {
        // Our first state called `menu`
        $stateProvider
            .state('game', {
                url: '',
                templateUrl: 'views/main.html',
                controller: 'MainController as ctrl'
            });
    }])

    .controller('MainController', ['$scope', '$storage', function ($scope, $storage)
    {
        var editorSession,
            editorRenderer;

        $scope.code = $storage.local.getItem("code") || "return { \n\t" +
                        "run : function(spaceCraft, world) \n\t" +
                        "{  \n\t\tspaceCraft.weapon.fire();  \n\t}  " +
                        "\n};";

        $scope.isCodeRunning = false;
        $scope.hideEditor = false;
        $scope.hideTutorial = true;

        $scope.tipsAndTricks =
        {
            hide: $storage.local.getItem("tipsAndTricks") || false
        };

        $scope.functionTutorial = {};
        $scope.functionTutorialOpen = false;
        $scope.functionFeedBackOpen = false;

        $scope.openFunctionTutorial = function (v)
        {
            $scope.functionTutorial = tutorial[v];
            $scope.functionTutorialOpen = true;
        };

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;

            editor.$blockScrolling = Infinity;

            editorSession.setValue($scope.code);

            var langTools = ace.require("ace/ext/language_tools");

            editor.setOptions(
            {
                enableBasicAutocompletion: true,
                enableSnippets: false,
                enableLiveAutocompletion: true
            });

            var rhymeCompleter = {
                getCompletions: function (edx, session, pos, prefix, callback)
                {
                    var str = editor.session.getLine(editor.getCursorPosition().row);

                    var reSpaceCraftPrefix = new RegExp(" *spaceCraft.\W*");
                    var reWeapon = new RegExp("\W*weapon.$");
                    var reEngine = new RegExp("\W*engine.$");
                    var reProtection = new RegExp("\W*protection.$");
                    var reGetEnemies = new RegExp("\W*getEnemies(\W*)");
                    var reGetBonuses = new RegExp("\W*getBonuses(\W*).");

                    var reWorldPrefix = new RegExp(" *world.\W*");

                    var functionsName = [];

                    if (reSpaceCraftPrefix.test(str))
                    {
                        if (reWeapon.test(str))
                        {
                            functionsName = getMethodsFrom("weaponBlock", functionsName);
                        }
                        else if (reEngine.test(str))
                        {
                            functionsName = getMethodsFrom("engineBlock", functionsName);
                        }
                        else if (reProtection.test(str))
                        {
                            functionsName = getMethodsFrom("protectionBlock", functionsName);
                        }
                        else
                        {
                            functionsName = getMethodsFrom("spaceCraft", functionsName);
                        }
                    }
                    else if (reWorldPrefix.test(str))
                    {
                        if (reGetEnemies.test(str))
                        {
                            functionsName = getMethodsFrom("enemy", functionsName);
                        }
                        else if (reGetBonuses.test(str))
                        {
                            functionsName = getMethodsFrom("bonus", functionsName);
                        }
                        else
                        {
                            functionsName = getMethodsFrom("world", functionsName);
                        }
                    }

                    callback(null, functionsName);
                }
            };

            langTools.addCompleter(rhymeCompleter);


            $storage.local.setItem("code", $scope.code);
        };

        function getMethodsFrom(name, array)
        {
            var functionsFrom = tutorial[name].functions;

            functionsFrom.forEach(function(value)
            {
                array.push(createAutoCompleteElement(value.name, name));
            });

            return array;
        }

        function createAutoCompleteElement(value, meta)
        {
            return {"value" : value, "meta" : meta};
        }

        $scope.aceChanged = function ()
        {
            $scope.code = editorSession.getDocument().getValue();

            $storage.local.setItem("code", $scope.code);
        };

        $scope.toggleEditorOpen = function ()
        {
            $scope.hideEditor = !$scope.hideEditor;
        };

        $scope.toggleCodeRun = function ()
        {
            $scope.isCodeRunning = !$scope.isCodeRunning;
        };

        $scope.toggleTutorialOpen = function ()
        {
            if ($scope.functionTutorialOpen)
            {
                $scope.functionTutorialOpen = false;
            }
            else
            {
                $scope.hideTutorial = !$scope.hideTutorial;
            }
        };

        $scope.openFeedBack = function ()
        {
            $scope.functionFeedBackOpen = !$scope.functionFeedBackOpen;
        };

        $scope.toggleTipsAndTricks = function ()
        {
            $scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
        };
    }]);
