'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
angular.module('spacecraft.gameCanvas', [])
    .directive('gameCanvas', ['$injector', function ($injector)
    {
        var linkFn = function (scope)
        {
            var spaceCraft;
            var world;
            var cursors;
            var isRunning;
            var userCode;
            var userObject;
            var toSpaceCraft;

            var game = SCG.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
                preload: preload,
                create: create,
                update: update
            });

            //===================================
            //============== HELP ===============
            //===================================

            function runUserScript()
            {
                if (isRunning)
                {
                    try
                    {
                        userObject.run(SpaceCraftApi(spaceCraft), WorldApi(world, spaceCraft.getId()));
                        scope.editorParams.error = false;
                    }
                    catch(err)
                    {
                        scope.editorParams.error = err.toString();
                        scope.editorParams.isCodeRunning = false;
                    }
                }
            }

            function followFor(object)
            {
                game.camera.follow(object);
                game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
                game.camera.focusOn(object);
            }

            function keysControl()
            {
                if (cursors.up.isDown) {
                    game.camera.unfollow(spaceCraft.sprite);
                    game.camera.y -= 4;
                }
                else if (cursors.down.isDown) {
                    game.camera.unfollow(spaceCraft.sprite);
                    game.camera.y += 4;
                }

                if (cursors.left.isDown) {
                    game.camera.unfollow(spaceCraft.sprite);
                    game.camera.x -= 4;
                }
                else if (cursors.right.isDown) {
                    game.camera.unfollow(spaceCraft.sprite);
                    game.camera.x += 4;
                }

                if (toSpaceCraft.isDown) {
                    followFor(spaceCraft.sprite);
                }
            }

            function gameInit(bounds)
            {
                game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.height, 'starField');
                game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

                game.scale.pageAlignVertically = true;
                game.scale.pageAlignHorizontally = true;

                //  Enable P2
                game.physics.startSystem(Phaser.Physics.P2JS);

                //  Turn on impact events for the world, without this we get no collision callbacks
                game.physics.p2.setImpactEvents(true);
                game.physics.p2.restitution = 0.8;

                cursors = game.input.keyboard.createCursorKeys();
                toSpaceCraft = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

                SCG.game.paused = true;
            }

            function collisionInit()
            {
                SCG.spaceCraftCollisionGroup = game.physics.p2.createCollisionGroup();
                SCG.bonusCollisionGroup = game.physics.p2.createCollisionGroup();
                game.physics.p2.updateBoundsCollisionGroup();
            }

            function worldInit(bounds)
            {
                // Создаем объект мира
                world = SCG.world = World({bounds: bounds});
                world.decorations.createMeteors({count: 2});
                world.createBots({
                    count: 20,
                    strategy: botStrategy,
                    health: 200,
                    shield: 100
                });
            }

            //===================================
            //============== CYCLE ==============
            //===================================

            function preload()
            {
                game.load.image('redBeam', 'resources/assets/sprites/beam/redBeam.png');
                game.load.image('greenBeam', 'resources/assets/sprites/beam/greenBeam.png');
                game.load.image('starField', 'resources/assets/sprites/starField.png');
                game.load.image('spaceCraft', 'resources/assets/sprites/spaceCraft/spaceCraft.png');
                game.load.image('spaceCraft1', 'resources/assets/sprites/spaceCraft/spaceCraft1.png');
                game.load.image('spaceCraft2', 'resources/assets/sprites/spaceCraft/spaceCraft2.png');
                game.load.image('spaceCraft3', 'resources/assets/sprites/spaceCraft/spaceCraft3.png');
                game.load.image('bonus1', 'resources/assets/sprites/bonus/bonus1.png');
                game.load.image('bonus2', 'resources/assets/sprites/bonus/bonus2.png');
                game.load.image('bonus3', 'resources/assets/sprites/bonus/bonus3.png');
                game.load.image('shield', 'resources/assets/sprites/shield.png');
                game.load.image('meteor1', 'resources/assets/sprites/meteor/meteor1.png');
                game.load.image('meteor2', 'resources/assets/sprites/meteor/meteor2.png');
                game.load.image('meteor3', 'resources/assets/sprites/meteor/meteor3.png');
                game.load.image('meteor4', 'resources/assets/sprites/meteor/meteor4.png');
                game.load.image('meteor5', 'resources/assets/sprites/meteor/meteor5.png');
                game.load.image('meteor6', 'resources/assets/sprites/meteor/meteor6.png');
                game.load.image('meteor7', 'resources/assets/sprites/meteor/meteor7.png');
                game.load.atlasJSONHash('bots', 'resources/assets/animations/bots.png', 'resources/assets/animations/bots.json');
                game.load.spritesheet('explosion', 'resources/assets/animations/explosion.png', 128, 128);
            }

            function create()
            {
                // Границы мира
                var bounds = {
                    x: 0,
                    y: 0,
                    width:  1920,
                    height: 1920
                };

                gameInit(bounds);

                collisionInit();

                worldInit(bounds);

                SCG.stop = function ()
                {
                    scope.editorParams.isCodeRunning = false;
                };
                scope.$apply(function createSpaceCraft()
                {
                    scope.spaceCraft = spaceCraft = SCG.spaceCraft = SpaceCraft({
                        x: game.world.centerX,
                        y: game.world.centerY,
                        spriteName: 'spaceCraft',
                        health: 200,
                        shield: 100
                    });
                });

                followFor(spaceCraft.sprite);


                scope.$watch('editorParams.code', function (n)
                {
                    userCode = n;
                });

                scope.$watch('editorParams.isCodeRunning', function (n)
                {
                    isRunning = n;

                    if (SCG.game)
                    {
                        SCG.game.paused = !isRunning;
                    }

                    if (n)
                    {
                        try
                        {
                            userObject = new Function(userCode)();
                        }
                        catch(err)
                        {
                            scope.editorParams.error = err.toString();
                            scope.editorParams.isCodeRunning = false;
                        }
                    }
                });
            }

            function update()
            {
                scope.$apply(function ()
                {
                    scope.spaceCraft = spaceCraft;
                    scope.player = {
                        isAlive: spaceCraft.isAlive,
                        statistic: spaceCraft.statistic
                    };

                    if (!spaceCraft.isAlive())
                    {
                        SCG.game.paused = true;
                    }
                });

                if(!SCG.game.paused)
                {
                    SCG.world.update();
                    runUserScript();
                }

                keysControl();
            }

            //===================================
            //============== SCOPE ==============
            //===================================

            scope.getNumber = function(num)
            {
                var arr = [];

                for (var i = 0; i < num; i++)
                {
                    arr.push(i);
                }

                return arr;
            };

            scope.$on('$destroy', function()
            {
                game.destroy(); // Clean up the game when we leave this scope
            });
        };

        return {
            scope:
            {
                editorParams: '=',
                player: '='
            },
            templateUrl: 'views/game.html',
            link: linkFn
        };

    }]);
