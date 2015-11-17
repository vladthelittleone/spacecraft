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
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

            var doc = " bla bla bla bla\n bla bla bla bla bla bla";

            var rhymeCompleter = {
                getCompletions: function (edx, session, pos, prefix, callback) {
                    var str = editor.session.getLine(editor.getCursorPosition().row);

                    var reSpaceCraft = new RegExp(" *spaceCraft.");
                    var reWorld = new RegExp(" *world.");

                    if (reSpaceCraft.test(str))
                    {
                        callback(null,  [
                                {"value" : "weapon" + doc, snippet: "weapon", "meta": "spaceCraft", type: "snippet"},
                                {"name" : "engine", "value" : "engine", "meta": "spaceCraft"},
                                {"name" : "protection", "value" : "protection", "meta": "spaceCraft"},
                                {"name" : "getId", "value" : "getId", "meta": "spaceCraft"},
                                {"name" : "getHealth", "value" : "getHealth", "meta": "spaceCraft"},
                                {"name" : "getRegeneration", "value" : "getRegeneration", "meta": "spaceCraft"},
                                {"name" : "getX", "value" : "getX", "meta": "spaceCraft"},
                                {"name" : "getY", "value" : "getY", "meta": "spaceCraft"},
                                {"name" : "getAngle", "value" : "getAngle", "meta": "spaceCraft"},
                                {"name" : "angleBetween", "value" : "angleBetween", "meta": "spaceCraft"},
                            ]
                        );
                    }
                    else if (reWorld.test(str))
                    {
                        callback(null,  [
                                {"name" : "rate", "value" : "rate", "meta": "world"},
                                {"name" : "damage", "value" : "damage", "meta": "world"},
                                {"name" : "range", "value" : "range", "meta": "world"}
                            ]
                        );

                    }

                }
            };

            langTools.addCompleter(rhymeCompleter);


            $storage.local.setItem("code", $scope.code);
        };

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
