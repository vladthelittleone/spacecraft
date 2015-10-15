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
                world,
                cursors,
                isRunning,
                userCode,
                userObject;

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

            /**
             * @constructor
             */
            var World = function (spec)
            {
                var that = {},
                    enemies = spec.enemies || [],
                    enemiesApi = [],
                    bounds = spec.bounds;

                enemies.forEach(function (enemy)
                {
                    enemiesApi.push(enemy.getUserAPI());
                });

                that.push = function (enemy)
                {
                    enemiesApi.push(enemy.getUserAPI());
                    enemies.push(enemy);
                };

                that.getEnemies = function ()
                {
                    return enemies;
                };

                that.getAllUnits = function ()
                {
                    var spaceCrafts = enemies.slice();
                    spaceCrafts.push(spaceCraft);
                    return spaceCrafts;
                };

                that.getUserAPI = function ()
                {
                    var api = {};

                    api.getEnemies = function ()
                    {
                        return enemiesApi;
                    };

                    api.getBounds = function ()
                    {
                        return bounds;
                    };

                    return api;
                };

                return that;
            };

            /**
             * @constructor
             */
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
                beams.setAll('outOfBoundsKill', true);
                beams.setAll('checkWorldBounds', true);

                var beamHit = function (enemy, beam)
                {
                    beam.kill();
                };

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
                            beam.reset(sprite.x, sprite.y);

                            if (!x || !y)
                            {
                                beam.rotation = sprite.rotation;
                                game.physics.arcade.velocityFromRotation(sprite.rotation, 400, beam.body.velocity);
                            }
                            else
                            {
                                beam.rotation = game.physics.arcade.moveToXY(beam, x, y, 400);
                            }

                            fireTime = game.time.now + fireRate;
                        }
                    }
                };

                that.update = function ()
                {
                    var units = world.getAllUnits();
                    units.forEach(function (u, i, arr)
                    {
                        if (sprite !== u.sprite)
                        {
                            if (game.physics.arcade.overlap(beams, u.sprite, beamHit, null, this))
                            {
                                u.hit(5);
                            }
                        }
                    });
                };

                return that;
            };

            /**
             * @constructor
             */
            var SpaceCraft = function (spec)
            {
                var that = {};

                that.health = scope.health = spec.health;

                // Если не заданы x, y проставляем рандомные значения мира
                var x = that.x = spec.x || game.world.randomX;
                var y = that.y = spec.y || game.world.randomY;

                // Создаем спрайт
                var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

                sprite.anchor.set(0.5);

                // Подключаем физику тел к кораблю
                game.physics.enable(sprite, Phaser.Physics.ARCADE);

                sprite.body.drag.set(0.2);
                sprite.body.maxVelocity.set(200);
                sprite.body.collideWorldBounds = true;

                // Поварачиваем корабль на init-угол
                !spec.angle || (sprite.angle = spec.angle);

                that.hit = function (damage)
                {
                    that.health -= damage;

                    if (that.health <= 0)
                    {
                        sprite.kill();
                    }
                };

                that.weapon = Weapon({
                    sprite: sprite,
                    damage: 50,
                    fireRate: 500,
                    spriteName: 'greenBeam'
                });

                // Переносим на верхний слой, перед лазерами.
                sprite.bringToTop();

                // Сообщаем angualrJS об изменениях
                scope.$apply();

                return that;
            };

            /**
             * @constructor
             */
            var EnemySpaceCraft = function (spec)
            {
                var that = SpaceCraft(spec);
                var sprite = that.sprite;
                var weapon = that.weapon;

                that.regeneration = function ()
                {
                    that.health += 5;
                    scope.$apply();
                };

                that.getUserAPI = function ()
                {
                    var api = {};

                    api.getX = function ()
                    {
                        return that.x;
                    };

                    api.getY = function ()
                    {
                        return that.y;
                    };

                    api.getHealth = function ()
                    {
                        return that.health;
                    };

                    return api;
                };

                return that;
            };

            /**
             * @constructor
             */
            var UserSpaceCraft = function (spec)
            {
                var that = SpaceCraft(spec);
                var sprite = that.sprite;
                var weapon = that.weapon;

                that.regeneration = function ()
                {
                    that.health += 5;
                    scope.$apply();
                };

                that.getUserAPI = function ()
                {
                    var api = {};

                    api.fire = function (x, y)
                    {
                        weapon.fire(x, y);
                    };

                    api.moveTo = function (x, y)
                    {
                        sprite.rotation = game.physics.arcade.moveToXY(sprite, x, y, 400);
                    };

                    api.getHealth = function ()
                    {
                        return that.health;
                    };

                    return api;
                };

                return that;
            };

            function runUserScript()
            {
                if (isRunning)
                {
                    userObject.run(spaceCraft.getUserAPI(), world.getUserAPI());
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
                game.load.image('spaceCraft1', 'resources/assets/spaceCraft1.png');
                game.load.image('spaceCraft2', 'resources/assets/spaceCraft2.png');
            }

            function create()
            {
                var bounds = {
                    x: 0,
                    y: 0,
                    width: 1920,
                    height: 1920
                };

                world = World({
                    bounds: bounds
                });

                game.add.tileSprite(0, 0, 1920, 1920, 'starField');
                game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

                game.scale.pageAlignVertically = true;
                game.scale.pageAlignHorizontally = true;

                //  We need arcade physics
                game.physics.startSystem(Phaser.Physics.ARCADE);

                spaceCraft = UserSpaceCraft({
                    x: game.world.centerX,
                    y: game.world.centerY,
                    spriteName: 'spaceCraft',
                    health: 100
                });

                for (var i = 0; i < 20; i++)
                {
                    var e = EnemySpaceCraft({
                        spriteName: 'spaceCraft' + (Math.floor(Math.random() * 2) + 1),
                        health: 100,
                        angle: game.rnd.angle()
                    });

                    world.push(e);
                }

                game.camera.follow(spaceCraft.sprite);
                game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
                game.camera.focusOn(spaceCraft.sprite);

                cursors = game.input.keyboard.createCursorKeys();
            }

            function update()
            {
                var units = world.getAllUnits();

                units.forEach(function (u, i, arr)
                {
                    u.weapon.update();
                });

                runUserScript();
            }

            function render()
            {
                var zone = game.camera.deadzone;

                var units = world.getAllUnits();

                game.context.fillStyle = 'rgba(255,255,255,0.1)';
                game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

                game.debug.cameraInfo(game.camera, 32, 32);
                game.debug.spriteCoords(spaceCraft.sprite, 32, 500);
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
            templateUrl: 'views/game.html',
            link: linkFn
        };

    }]);
