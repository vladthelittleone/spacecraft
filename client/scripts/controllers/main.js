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

            var spaceCraftCompleter = {
                getCompletions: function (edx, session, pos, prefix, callback)
                {
                    var str = editor.session.getLine(editor.getCursorPosition().row);

                    var functionsName = [];

                    var check = [
                        {regExp: " *spaceCraft.weapon.$", name: "weaponBlock"},
                        {regExp: " *spaceCraft.engine.$", name: "engineBlock"},
                        {regExp: " *spaceCraft.protection.$", name: "protectionBlock"},
                        {regExp: " *world.getEnemies(\W*)", name: "enemy"},
                        {regExp: " *spaceCraft.$", name: "spaceCraft"},
                        {regExp: " *world.$", name: "world"},
                        {regExp: " *enemy.weapon.$", name: "enemyWeapon"},
                        {regExp: " *spaceCraft.engine.moveSpeed.$", name: "module"},
                        {regExp: " *spaceCraft.weapon.rate.$", name: "module"},
                        {regExp: " *spaceCraft.weapon.range.$", name: "module"},
                        {regExp: " *spaceCraft.weapon.damage.$", name: "module"},
                        {regExp: " *spaceCraft.protection.regeneration.$", name: "module"}
                    ];

                    check.forEach(function(value)
                    {
                        functionsName = functionsName.concat(test(str, new RegExp(value.regExp), value.name));
                    });

                    if (functionsName.length === 0)
                    {
                        check.forEach(function(value){
                           functionsName = functionsName.concat(getMethodsFrom(value.name));
                        });
                        // todo bonus, module, enemy.weapon
                        functionsName.push(createAutoCompleteElement("spaceCraft", "local"));
                        functionsName.push(createAutoCompleteElement("world", "local"));
                        functionsName.push(createAutoCompleteElement("bonus", "user"));
                        functionsName.push(createAutoCompleteElement("enemy", "user"));
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


            $storage.local.setItem("code", $scope.code);
        };

        function test(string, regExp, name)
        {
            if (regExp.test(string))
            {
                return getMethodsFrom(name);
            }

            return [];
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
