'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
angular.module('spacecraft')
    .directive('gameCanvas', ['$injector', function ($injector)
    {
        var linkFn = function (scope, element, attrs)
        {
            var spaceCraft,
                cursors,
                isRunning,
                userCode,
                userObject;

            var Weapon = function (spec)
            {
                var that = {},
                    sprite = spec.sprite,
                    damage = spec.damage,
                    fireRate = spec.fireRate,
                    spriteName = spec.spriteName,
                    fireTime = 0;

                //  Our bullet group
                var beams = game.add.group();

                beams.enableBody = true;
                beams.physicsBodyType = Phaser.Physics.ARCADE;

                beams.createMultiple(30, spriteName, 0, false);

                beams.setAll('anchor.x', 0.5);
                beams.setAll('anchor.y', 0.5);
                beams.setAll('scale.x', 0.1);
                beams.setAll('scale.y', 0.1);
                beams.setAll('outOfBoundsKill', true);
                beams.setAll('checkWorldBounds', true);

                that.getDamage = function ()
                {
                    return damage;
                };

                that.getFireRate = function ()
                {
                    return fireRate;
                };

                that.fire = function (x, y)
                {
                    if (game.time.now > fireTime)
                    {
                        var beam = beams.getFirstExists(false);

                        if (beam)
                        {
                            var craftRotation = sprite.rotation - 90 * (Math.PI / 180);

                            beam.reset(sprite.body.x, sprite.body.y);

                            if (!x || !y)
                            {
                                beam.rotation = craftRotation;
                                game.physics.arcade.velocityFromRotation(craftRotation, 400, beam.body.velocity);
                            }
                            else
                            {
                                beam.rotation = game.physics.arcade.moveToXY(beam, x, y, 400);
                            }

                            fireTime = game.time.now + fireRate;
                        }
                    }
                };

                return that;
            };

            /**
             * @constructor
             */
            var SpaceCraft = function (spec)
            {
                var that = {};
                var sprite = game.add.sprite(spec.x, spec.y, spec.spriteName);

                var weapon = Weapon({
                    sprite: sprite,
                    damage: 50,
                    fireRate: 500,
                    spriteName: 'greenBeam'
                });

                sprite.bringToTop();

                that.sprite = function ()
                {
                    return sprite;
                };

                that.getUserAPI = function ()
                {
                    var api = {};

                    api.rotateLeft = function ()
                    {
                        sprite.body.rotateLeft(1);
                    };

                    api.rotateRight = function ()
                    {
                        sprite.body.rotateRight(1);
                    };

                    api.setZeroRotation = function ()
                    {
                        sprite.body.setZeroRotation();
                    };

                    api.fire = function (x, y)
                    {
                        weapon.fire(x, y);
                    };

                    api.thrust = function ()
                    {
                        sprite.body.thrust(10);
                    };

                    api.reverse = function ()
                    {
                        sprite.body.reverse(10);
                    };

                    return api;
                };

                return that;
            };

            // Build the game object
            //var height  = parseInt(element.css('height'), 10),
            //    width   = parseInt(element.css('width'), 10);

            var game = new Phaser.Game(window.innerWidth, window.innerWidth, Phaser.CANVAS, 'game', {
                init: init,
                preload: preload,
                create: create,
                update: update,
                render: render
            });

            function runUserScript()
            {
                if (isRunning)
                {
                    userObject.run(spaceCraft.getUserAPI());
                }
            }

            function init()
            {
                game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            }

            function preload()
            {
                game.load.image('redBeam', 'resources/assets/redBeam.png');
                game.load.image('greenBeam', 'resources/assets/greenBeam.png');
                game.load.image('starField', 'resources/assets/starField.png');
                game.load.image('spaceCraft', 'resources/assets/spaceCraft.png');
            }

            function create()
            {
                game.add.tileSprite(0, 0, 1920, 1920, 'starField');
                game.world.setBounds(0, 0, 1920, 1920);

                game.scale.pageAlignVertically = true;
                game.scale.pageAlignHorizontally = true;

                spaceCraft = SpaceCraft({
                    x: game.world.centerX,
                    y: game.world.centerY,
                    spriteName: 'spaceCraft'
                });

                game.physics.startSystem(Phaser.Physics.P2JS);

                game.physics.p2.enable(spaceCraft.sprite());

                game.camera.follow(spaceCraft.sprite());
                game.camera.deadzone = new Phaser.Rectangle(100, 100, 500, 500);

                cursors = game.input.keyboard.createCursorKeys();
            }

            function update()
            {
                runUserScript();
            }

            function render()
            {
                var zone = game.camera.deadzone;

                game.context.fillStyle = 'rgba(255,255,255,0.1)';
                game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

                game.debug.cameraInfo(game.camera, 32, 32);
                game.debug.spriteCoords(spaceCraft.sprite(), 32, 500);
            }

            scope.$watch('code', function (n)
            {
                userCode = n;
            });

            scope.$watch('isRunning', function (n)
            {
                isRunning = n;

                if (n)
                {
                    userObject = new Function(userCode)();
                }
            });
        };

        return {
            scope: {
                code: '=',
                isRunning: '='
            },
            template: '<div id="gameCanvas"></div>',
            link: linkFn
        };
    }]);
