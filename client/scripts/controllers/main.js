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
        //===================================
        //============== CODE ===============
        //===================================

        var code = $storage.local.getItem('code') || 'return { \n\t' +
            'run : function(spaceCraft, world) \n\t' +
            '{  \n\t\tspaceCraft.weapon.fire();  \n\t}  ' +
            '\n};';

        $scope.player = null;
        $scope.ep =
        {
            isCodeRunning: false,
            code: code,
            error: null
        };

        $scope.toggleCodeRun = function ()
        {
            $scope.ep.isCodeRunning = !$scope.ep.isCodeRunning;
        };

        //===================================
        //============== HIDE ===============
        //===================================

        $scope.hideEditor = false;
        $scope.hideTutorial = true;

        $scope.toggleEditorOpen = function ()
        {
            $scope.hideEditor = !$scope.hideEditor;
        };

        $scope.toggleTutorialOpen = function ()
        {
            $scope.functionTutorialOpen = false;
            $scope.hideTutorial = !$scope.hideTutorial;
        };

        //===================================
        //============== TIPS-TRICKS ========
        //===================================

        $scope.tipsAndTricks = { hide: $storage.local.getItem('tipsAndTricks') || false };

        $scope.toggleTipsAndTricks = function ()
        {
            $scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
        };

        //===================================
        //============== FUNCTION ===========
        //===================================

        $scope.functionTutorial = {};
        $scope.functionTutorialOpen = false;

        $scope.openFunctionTutorial = function (v)
        {
            $scope.functionTutorial = tutorial[v];
            $scope.functionTutorialOpen = true;
        };

        //===================================
        //============== EDITOR =============
        //===================================

        var editorSession;
        var editorRenderer;

        $scope.aceChanged = function ()
        {
            $scope.ep.code = editorSession.getDocument().getValue();
            $storage.local.setItem('code', $scope.ep.code);
        };

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;
            editor.$blockScrolling = Infinity;
            editorSession.setValue($scope.ep.code);

            var langTools = ace.require('ace/ext/language_tools');

            // TODO
            // вынести в сервис
            var spaceCraftCompleter =
            {
                getCompletions: function (edx, session, pos, prefix, callback)
                {
                    var str = editor.session.getLine(editor.getCursorPosition().row);

                    var check = [
                        {regExps: [' *spaceCraft.weapon.$'], name: 'weaponBlock'},
                        {regExps: [' *spaceCraft.engine.$'], name: 'engineBlock'},
                        {regExps: [' *spaceCraft.protection.$'], name: 'protectionBlock'},
                        {regExps: [' *spaceCraft.$'], name: 'spaceCraft'},
                        {regExps: [' *world.$'], name: 'world'},
                        {regExps: [' *enemy.$'], name: 'enemy'},
                        {regExps: [' *bonus.$'], name: 'bonus'},
                        {regExps: [' *enemy.weapon.$'], name: 'enemyWeapon'},
                        {
                            regExps: [
                                ' *spaceCraft.engine.moveSpeed.$',
                                ' *spaceCraft.weapon.rate.$',
                                ' *spaceCraft.weapon.range.$',
                                ' *spaceCraft.weapon.damage.$',
                                ' *spaceCraft.protection.regeneration.$'
                            ], name: 'module'
                        }
                    ];

                    callback(null, generateAutocomplete(check, str));
                }
            };

            editor.completers = [spaceCraftCompleter];
            editor.setOptions(
                {
                    enableSnippets: false,
                    enableBasicAutocompletion: true
                });

            langTools.addCompleter(spaceCraftCompleter);

            $storage.local.setItem('code', $scope.ep.code);
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

            functionsFrom.forEach(function (value)
            {
                array = array.concat(createAutoCompleteElement(value.name, name));
            });

            return array;
        }

        function createAutoCompleteElement(value, meta)
        {
            return {value: value, meta: meta};
        }

        function generateAutocomplete(check, str)
        {
            var functionsName = [];

            check.forEach(function (value)
            {
                functionsName = functionsName.concat(test(str, value));
            });

            if (!functionsName.length)
            {
                check.forEach(function (value)
                {
                    functionsName = functionsName.concat(getMethodsFrom(value.name));
                });

                functionsName.push(createAutoCompleteElement('spaceCraft', 'local'));
                functionsName.push(createAutoCompleteElement('world', 'local'));
            }

            return functionsName;
        }
    }]);
