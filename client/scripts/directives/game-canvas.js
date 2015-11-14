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
        var linkFn = function (scope, element, attrs)
        {
            var spaceCraft,
                world,
                cursors,
                isRunning,
                userCode,
                userObject;

            // Build the game object
            //var height  = parseInt(element.css('height'), 10),
            //    width   = parseInt(element.css('width'), 10);

            var game = SCG.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
                preload: preload,
                create: create,
                update: update
            });

            function runUserScript()
            {
                if (isRunning)
                {
                    try
                    {
                        userObject.run(SpaceCraftApi(spaceCraft), WorldApi(world, spaceCraft.getId()));
                    }
                    catch(err)
                    {
                        scope.error = err.toString();
                        scope.isRunning = false;
                    }
                }
            }

            function preload()
            {
                game.load.image('redBeam', 'resources/assets/redBeam.png');
                game.load.image('greenBeam', 'resources/assets/greenBeam.png');
                game.load.image('starField', 'resources/assets/starField.png');
                game.load.image('spaceCraft', 'resources/assets/spaceCraft.png');
                game.load.image('spaceCraft1', 'resources/assets/spaceCraft1.png');
                game.load.image('spaceCraft2', 'resources/assets/spaceCraft2.png');
                game.load.image('spaceCraft3', 'resources/assets/spaceCraft3.png');
                game.load.image('bonus1', 'resources/assets/bonus1.png');
                game.load.image('bonus2', 'resources/assets/bonus2.png');
                game.load.image('bonus3', 'resources/assets/bonus3.png');
                game.load.image('shield', 'resources/assets/shield.png');
                game.load.atlasJSONHash('bots', 'resources/assets/bots.png', 'resources/assets/bots.json');
                game.load.spritesheet('explosion', 'resources/assets/explosion.png', 128, 128);
            }

            function create()
            {
                // Границы мира
                var bounds = {
                    x: 0,
                    y: 0,
                    width: 1920,
                    height: 1920
                };

                game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.height, 'starField');
                game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

                game.scale.pageAlignVertically = true;
                game.scale.pageAlignHorizontally = true;

                //  Enable P2
                game.physics.startSystem(Phaser.Physics.P2JS);

                //  Turn on impact events for the world, without this we get no collision callbacks
                game.physics.p2.setImpactEvents(true);
                game.physics.p2.restitution = 0.8;

                // Создаем объект мира
                world = SCG.world = World({bounds: bounds});

                SCG.stop = function ()
                {
                    scope.isRunning = false;
                };

                SCG.spaceCraftCollisionGroup = game.physics.p2.createCollisionGroup();
                SCG.bonusCollisionGroup = game.physics.p2.createCollisionGroup();
                game.physics.p2.updateBoundsCollisionGroup();

                scope.$apply(function ()
                {
                    scope.spaceCraft = spaceCraft = SCG.spaceCraft = SpaceCraft({
                        x: game.world.centerX,
                        y: game.world.centerY,
                        spriteName: 'spaceCraft',
                        health: 200,
                        shield: 100
                    });
                });

                for (var i = 0; i < 14; i++)
                {
                    var modX = bounds.height - 320;
                    var modY = bounds.width - 320;

                    SpaceCraft({
                        strategy: botStrategy,
                        x: game.world.randomX % modX + 200,
                        y: game.world.randomY % modY + 200,
                        spriteName: 'spaceCraft' + utils.randomInt(1, 3),
                        health: 200,
                        angle: game.rnd.angle(),
                        shield: 100
                    });
                }

                game.camera.follow(spaceCraft.sprite);
                game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
                game.camera.focusOn(spaceCraft.sprite);

                cursors = game.input.keyboard.createCursorKeys();

                scope.$watch('code', function (n)
                {
                    userCode = n;
                });

                scope.$watch('isRunning', function (n)
                {
                    isRunning = n;

                    if (SCG.game)
                    {
                        SCG.game.paused = !isRunning;
                    }

                    if (n)
                    {
                        userObject = new Function(userCode)();
                    }
                });

                SCG.game.paused = true;
            }

            function update()
            {
                scope.$apply(function ()
                {
                    scope.spaceCraft = spaceCraft;

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
            }

            //function render()
            //{
            //    var zone = game.camera.deadzone;
            //
            //    game.context.fillStyle = 'rgba(255,255,255,0.1)';
            //    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
            //
            //    game.debug.cameraInfo(game.camera, 32, 32);
            //    game.debug.spriteCoords(spaceCraft.sprite, 32, 500);
            //}

            scope.getNumber = function(num)
            {
                var arr = [];

                for (var i = 0; i < num; i++)
                {
                    arr.push(i);
                }

                return arr;
            }
        };

        return {
            scope: {
                code: '=',
                isRunning: '='
            },
            templateUrl: 'views/game.html',
            link: linkFn
        };

    }]);
