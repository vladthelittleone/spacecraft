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

        var code = $storage.local.getItem("code") || "return { \n\t" +
                        "run : function(spaceCraft, world) \n\t" +
                        "{  \n\t\tspaceCraft.weapon.fire();  \n\t}  " +
                        "\n};";

        $scope.player = null;
        $scope.ep =
        {
            isCodeRunning: false,
            code : code,
            error: null
        };

        $scope.hideEditor = false;
        $scope.hideTutorial = true;

        $scope.tipsAndTricks = { hide: $storage.local.getItem("tipsAndTricks") || false };

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

            editorSession.setValue($scope.ep.code);

            var langTools = ace.require("ace/ext/language_tools");

            var spaceCraftCompleter =
            {
                getCompletions: function (edx, session, pos, prefix, callback)
                {
                    var str = editor.session.getLine(editor.getCursorPosition().row);

                    var functionsName = [];

                    var check = [
                        {regExps: [" *spaceCraft.weapon.$"], name: "weaponBlock"},
                        {regExps: [" *spaceCraft.engine.$"], name: "engineBlock"},
                        {regExps: [" *spaceCraft.protection.$"], name: "protectionBlock"},
                        {regExps: [" *spaceCraft.$"], name: "spaceCraft"},
                        {regExps: [" *world.$"], name: "world"},
                        {regExps: [" *enemy.$"], name: "enemy"},
                        {regExps: [" *bonus.$"], name: "bonus"},
                        {regExps: [" *enemy.weapon.$"], name: "enemyWeapon"},
                        {regExps: [
                            " *spaceCraft.engine.moveSpeed.$",
                            " *spaceCraft.weapon.rate.$",
                            " *spaceCraft.weapon.range.$",
                            " *spaceCraft.weapon.damage.$",
                            " *spaceCraft.protection.regeneration.$"
                        ], name: "module"}
                    ];

                    check.forEach(function(value)
                    {
                        functionsName = functionsName.concat(test(str, value));
                    });

                    if (functionsName.length === 0)
                    {
                        check.forEach(function(value)
                        {
                           functionsName = functionsName.concat(getMethodsFrom(value.name));
                        });

                        functionsName.push(createAutoCompleteElement("spaceCraft", "local"));
                        functionsName.push(createAutoCompleteElement("world", "local"));
                    }

                    callback(null, functionsName);
                }
            };

            editor.completers = [spaceCraftCompleter];

            editor.setOptions(
            {
                enableSnippets: false,
                enableBasicAutocompletion: true
            });

            langTools.addCompleter(spaceCraftCompleter);


            $storage.local.setItem("code", $scope.ep.code);
        };

        function test(string, value)
        {
            var name = value.name;
            var result = [];

            value.regExps.forEach(function (r)
            {
                var regExp = new RegExp(r);

                if (regExp.test(string))
                {
                    result = result.concat(getMethodsFrom(name));
                }
            });

            return result;
        }

        function getMethodsFrom(name)
        {
            var array = [];

            var functionsFrom = tutorial[name].functions;

            functionsFrom.forEach(function(value)
            {
                array = array.concat(createAutoCompleteElement(value.name, name));
            });

            return array;
        }

        function createAutoCompleteElement(value, meta)
        {
            return {"value" : value, "meta" : meta};
        }

        $scope.aceChanged = function ()
        {
            $scope.ep.code = editorSession.getDocument().getValue();

            $storage.local.setItem("code", $scope.ep.code);
        };

        $scope.toggleEditorOpen = function ()
        {
            $scope.hideEditor = !$scope.hideEditor;
        };

        $scope.toggleCodeRun = function ()
        {
            $scope.ep.isCodeRunning = !$scope.ep.isCodeRunning;
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
