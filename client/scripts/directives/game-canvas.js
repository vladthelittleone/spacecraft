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
                collisionGroup,
                userObject,
                sequence = seq();

            // Build the game object
            //var height  = parseInt(element.css('height'), 10),
            //    width   = parseInt(element.css('width'), 10);

            var game = SCGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
                preload: preload,
                create: create,
                update: update,
                render: render
            });

            /**
             * @constructor
             */
            var SpaceCraft = function (spec)
            {
                var that = {};

                var maxHealth = that.health = scope.health = spec.health;

                // Стратегия, которая будет использоваться
                // для бота, либо игроква
                var strategy = spec.strategy;
                var id = sequence.next();

                // Если не заданы x, y проставляем рандомные значения мира
                // Координаты корабля (спрайта)
                var x = spec.x || game.world.randomX;
                var y = spec.y || game.world.randomY;

                // Создаем спрайт
                var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

                // Центрирование
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;

                // Включаем проверку на коллизии с границей
                sprite.checkWorldBounds = true;

                // Подключаем физику тел к кораблю
                game.physics.p2.enable(sprite, true);

                //  Добавляем группу коллизий
                sprite.body.setCollisionGroup(collisionGroup);

                // Поварачиваем корабль на init-угол
                !spec.angle || (sprite.body.angle = spec.angle);

                that.weapon = Weapon({
                    sprite: sprite,
                    damage: 10,
                    fireRate: 500,
                    fireRange: 300,
                    velocity: 400,
                    spriteName: 'greenBeam'
                });

                that.getId = function ()
                {
                    return id;
                };

                that.addHealth = function (add)
                {
                    that.health += add;
                    scope.$apply();
                };

                that.update = function ()
                {
                    strategy(that, world);
                };

                that.regeneration = function ()
                {
                    that.health += 5;
                    scope.$apply();
                };

                that.rotateLeft = function ()
                {
                    sprite.body.rotateLeft(1);
                };

                that.rotateRight = function ()
                {
                    sprite.body.rotateRight(1);
                };

                /**
                 * Поворот к объекту.
                 *
                 * @param another - объект
                 * @returns {boolean} true/false - совершил поворот / не совершил
                 */
                that.rotateTo = function (another)
                {
                    var angle = that.angleBetween(another);

                    // Угол меньше 20 - не делаем поворот
                    if (Math.abs(angle) > 20)
                    {
                        if (angle > 0)
                        {
                            that.rotateRight();
                        }
                        else
                        {
                            that.rotateLeft();
                        }

                        return true;
                    }
                    else
                    {
                        return false;
                    }
                };

                that.moveForward = function ()
                {
                    sprite.body.moveForward(20);
                };

                that.moveBackward = function ()
                {
                    sprite.body.moveBackward(20);
                };

                that.hit = function (damage)
                {
                    that.health -= damage;

                    if (that.health <= 0)
                    {
                        // Создание нового бонуса и занесение его в bonusArray
                        world.pushBonus(Bonus({
                            sprite: 'bonus1',
                            x: sprite.body.x,
                            y: sprite.body.y,
                            angle: game.rnd.angle()
                        }));

                        var boomSprite = game.add.sprite(that.sprite.x, that.sprite.y, 'explosion');

                        boomSprite.anchor.x = 0.5;
                        boomSprite.anchor.y = 0.5;

                        // массив это то какие кадры использовать и в какой последовательности
                        boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

                        // вторая констатна это количество кадров в секунду при воспроизвелении анимации
                        boomSprite.play('boom', 16, false, true);

                        sprite.reset(game.world.randomX, game.world.randomY);
                        that.health = maxHealth;
                    }
                };

                that.getHealth = function ()
                {
                    return that.health;
                };

                that.getX = function ()
                {
                    return sprite.x;
                };

                that.getY = function ()
                {
                    return sprite.y;
                };

                that.getAngle = function ()
                {
                    return sprite.body.angle;
                };

                that.angleBetween = function (another)
                {
                    var math = Phaser.Math;

                    // Угол линии от точки к точке в пространстве.
                    var a1 = math.angleBetween(sprite.x, sprite.y, another.getX(), another.getY()) + (Math.PI / 2);
                    var a2 = math.degToRad(that.getAngle());

                    a1 = math.normalizeAngle(a1);
                    a2 = math.normalizeAngle(a2);

                    a1 = math.radToDeg(a1);
                    a2 = math.radToDeg(a2);

                    var m1 = (360 - a1) + a2;
                    var m2 = a1 - a2;

                    if (m1 < m2)
                    {
                        return -m1;
                    }
                    else
                    {
                        return m2;
                    }
                };

                that.distance = function (another)
                {
                    var p = new Phaser.Point(another.getX(), another.getY());

                    return Phaser.Point.distance(sprite, p);
                };

                // Переносим на верхний слой, перед лазерами.
                sprite.bringToTop();

                // Сообщаем angualrJS об изменениях
                scope.$apply();

                return that;
            };

            function runUserScript()
            {
                if (isRunning)
                {
                    userObject.run(SpaceCraftApi(spaceCraft), WorldApi(world, spaceCraft.getId()));
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
                game.load.spritesheet('explosion', 'resources/assets/explosion.png', 128, 128);
                game.load.image('bonus1', 'resources/assets/bonus1.png');
                game.load.image('bonus2', 'resources/assets/bonus2.png');
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

                game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.height, 'starField');
                game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

                game.scale.pageAlignVertically = true;
                game.scale.pageAlignHorizontally = true;

                //  Enable P2
                game.physics.startSystem(Phaser.Physics.P2JS);

                //  Turn on impact events for the world, without this we get no collision callbacks
                game.physics.p2.setImpactEvents(true);
                game.physics.p2.restitution = 0.8;

                collisionGroup = game.physics.p2.createCollisionGroup();
                game.physics.p2.updateBoundsCollisionGroup();

                spaceCraft = SpaceCraft({
                    strategy: function (s) { s.weapon.update(); },
                    x: game.world.centerX,
                    y: game.world.centerY,
                    spriteName: 'spaceCraft',
                    health: 100
                });

                world.pushSpaceCraft(spaceCraft);

                for (var i = 0; i < 20; i++)
                {
                    var e = SpaceCraft({
                        strategy: botStrategy,
                        spriteName: 'spaceCraft' + randomInt(1, 2),
                        health: 100,
                        angle: game.rnd.angle()
                    });

                    world.pushSpaceCraft(e);
                }

                game.camera.follow(spaceCraft.sprite);
                game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
                game.camera.focusOn(spaceCraft.sprite);

                cursors = game.input.keyboard.createCursorKeys();
            }

            function update()
            {
                var enemies = world.getEnemies();

                enemies.forEach(function (e)
                {
                    e.update();
                });


                runUserScript();
            }

            function render()
            {
                var zone = game.camera.deadzone;

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

    }])
;
