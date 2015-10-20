'use strict';

/**
 * @ngdoc directive
 * @name spacecraft.directive:gameCanvas
 * @description
 * # gameCanvas
 */
angular.module('spacecraft')
    .directive('gameCanvas', ['$injector', function ($injector) {
        var linkFn = function (scope, element, attrs) {
            var spaceCraft,
                starField,
                world,
                cursors,
                isRunning,
                userCode,
                collisionGroup,
                userObject,
                idGeneratorSpaceCraft = 0,
                idGeneratorBonus = 0;

            // Build the game object
            //var height  = parseInt(element.css('height'), 10),
            //    width   = parseInt(element.css('width'), 10);

            Array.prototype.removeElement = function (element) {
                var index = this.indexOf(element);
                this.removeElementByIndex(index)
            };

            Array.prototype.removeElementByIndex = function (index) {
                if (index > -1) {
                    this.splice(index, 1);
                }
            };

            /**
             * Returns a random number between min (inclusive) and max (exclusive)
             */
            function randomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }

            /**
             * Returns a random integer between min (inclusive) and max (inclusive)
             * Using Math.round() will give you a non-uniform distribution!
             */
            function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
                preload: preload,
                create: create,
                update: update,
                render: render
            });

            /**
             * @constructor
             * Класс бонусов выпадающих после
             * Уничтожения корабля
             */
            var Bonus = function (spec) {
                var that = {};
                var x = that.x = spec.x;
                var y = that.y = spec.y;
                var type = spec.type;
                var bonusCollisionGroup = game.physics.p2.createCollisionGroup();

                // Добавляем спрайт бонуса
                var sprite = that.sprite = game.add.sprite(x, y, spec.sprite);
                sprite.name = idGeneratorBonus + 1;

                // Подключаем физику тел к бонусу
                game.physics.p2.enable(sprite, true);

                // Поварачиваем бонус на init-угол
                !spec.angle || (sprite.body.angle = spec.angle);

                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.scale.setTo(0.5);
                sprite.checkWorldBounds = true;

                that.body.mass = 0.00001;

                that.body.setCollisionGroup(bonusCollisionGroup);
                that.body.collides(collisionGroup);

                that.getX = function () {
                    return sprite.x;
                };

                that.getY = function () {
                    return sprite.y;
                };

                that.getType = function () {
                    return type;
                };

                that.api = {};
                that.api.getY = that.getY;
                that.api.getX = that.getX;
                that.api.getType = that.getType;

                return that;
            };

            var HealthBonus = function (spec) {
                var that = Bonus(spec);
                var health = spec.health;

                that.useBonus = function (spaceCraft) {
                    this.addHealth(health);
                };

                return that;
            };

            var DamageBonus = function (spec) {
                var that = Bonus(spec);
                var damage = spec.damage;

                that.useBonus = function (spaceCraft) {
                    this.weapon.addDamage(damage);
                };

                return that;
            };

            /**
             * @constructor
             */
            var World = function (spec) {
                var that = {},
                    enemies = spec.enemies || [],
                    enemiesApi = [],
                    bounds = spec.bounds,
                    bonusArray = [];

                enemies.forEach(function (enemy) {
                    enemiesApi.push(enemy.api);
                });

                // Положить в массив бонусов
                that.pushBonus = function (bonus) {
                    bonusArray.push(bonus);
                };

                that.pushEnemy = function (enemy) {
                    enemiesApi.push(enemy.api);
                    enemies.push(enemy);
                };

                that.removeEnemy = function (enemy) {
                    enemies.removeElement(enemy);
                    enemiesApi.removeElement(enemy.api);
                };

                that.getEnemies = function () {
                    return enemies;
                };

                that.getAllUnits = function () {
                    var spaceCrafts = enemies.slice();
                    spaceCrafts.push(spaceCraft);
                    return spaceCrafts;
                };

                that.api = {};

                that.api.getEnemies = function (callback) {
                    if (callback) {
                        enemiesApi.forEach(function (e, i, arr) {
                            callback(e, i, arr);
                        })
                    }

                    return enemiesApi;
                };

                that.api.getBounds = function () {
                    return bounds;
                };

                // Получить массив бонусов
                that.api.getBonuses = function (callback) {
                    if (callback) {
                        bonusArray.forEach(function (e, i, arr) {
                            callback(e, i, arr);
                        })
                    }

                    return bonusArray;
                };

                return that;
            };

            /**
             * @constructor
             */
            var Weapon = function (spec) {
                var that = {},
                    sprite = spec.sprite,
                    damage = spec.damage,
                    fireRate = spec.fireRate,
                    fireRange = spec.fireRange,
                    spriteName = spec.spriteName,
                    velocity = spec.velocity,
                    beamsCollisionGroup = game.physics.p2.createCollisionGroup(),
                    fireTime = 0;

                //  Our beam group
                var beams = game.add.group();

                // Массив выпущенных снарядов
                var beamsArray = [];

                beams.setAll('anchor.x', 0.5);
                beams.setAll('anchor.y', 0.5);
                beams.setAll('outOfBoundsKill', true);
                beams.setAll('checkWorldBounds', true);

                beams.enableBody = true;
                beams.physicsBodyType = Phaser.Physics.P2JS;

                that.addDamage = function (add) {
                    damage += add;
                };

                that.update = function () {
                    var units = world.getAllUnits();

                    // Проходимся по всем снарядам выпущенным кораблем
                    beamsArray.forEach(function (b, i) {
                        // Проверка вышел ли  снаряд за range ружия
                        if (Phaser.Point.distance(sprite, b) > fireRange) {
                            if (b.body) {
                                // Уничтожаем спрайт снаряда и удаляем его из массива снарядов
                                b.body.destroy();
                                b.destroy();
                                beamsArray.removeElementByIndex(i);
                            }
                        }
                    });

                    units.forEach(function (u) {
                        // Не наносим урон себе
                        if (sprite !== u.sprite) {
                            // Callback при коллизии пули с кораблем
                            var beamHit = function (unit, beam) {
                                /**
                                 * Уничтожаем пулю
                                 *
                                 * TODO
                                 * Странная проверка, так как мы удаляем body,
                                 * но все равно вызывается beamHit
                                 */
                                if (beam.sprite) {
                                    beam.sprite.destroy();
                                    beam.destroy();

                                    // Наносим урон
                                    u.hit(damage);
                                }
                            };

                            u.sprite.body.collides(beamsCollisionGroup, beamHit, null, this);
                        }
                    });
                };

                that.getDamage = function () {
                    return damage;
                };

                that.getFireRate = function () {
                    return fireRate;
                };

                that.getFireRange = function () {
                    return fireRange;
                };

                that.inRange = function (another) {
                    var p = new Phaser.Point(another.getX(), another.getY());

                    if (Phaser.Point.distance(sprite, p) < fireRange) {
                        return true;
                    }

                    return false;
                };

                that.fire = function (obj1, obj2) {
                    var x = obj1,
                        y = obj2;

                    // Првоерка на объект.
                    // Если есть x, y то это объект,
                    // например корабль
                    if ((typeof obj1.getX === 'function') && (typeof obj1.getY === 'function')) {
                        x = obj1.getX();
                        y = obj1.getY();
                    }

                    // Проверка делэя. Не стреляем каждый фрэйм.
                    if (game.time.now > fireTime) {
                        var beam = beams.create(sprite.body.x, sprite.body.y, spriteName);

                        // Добавляем выпущенный снаряд в массив снарядов
                        beamsArray.push(beam);

                        beam.body.collideWorldBounds = false;

                        // Устанавливаем маленькую массу,
                        // что б при столкновении с пулей
                        // кораблик не взаимодействовал с ней.
                        beam.body.mass = 0.00001;

                        beam.body.setCollisionGroup(beamsCollisionGroup);
                        beam.body.collides(collisionGroup);

                        var dx = x - beam.x;
                        var dy = y - beam.y;

                        if (beam) {
                            if (!x || !y) {
                                // Поворот пули по направлению корабля
                                beam.body.rotation = sprite.body.rotation - (Math.PI / 2);
                            }
                            else {
                                // Поворот пули по x, y
                                beam.body.rotation = Math.atan2(dy, dx);
                            }

                            var angle = beam.body.rotation;

                            beam.body.velocity.x = velocity * Math.cos(angle);
                            beam.body.velocity.y = velocity * Math.sin(angle);

                            fireTime = game.time.now + fireRate;
                        }
                    }
                };

                that.enemiesInRange = function () {
                    var a = [];

                    world.getEnemies().forEach(function (e) {
                        if (Phaser.Point.distance(sprite, e.sprite) < fireRange) {
                            a.push(e.api);
                        }
                    });

                    return a;
                };

                that.api = {};
                that.api.getDamage = that.getDamage;
                that.api.getFireRate = that.getFireRate;
                that.api.getFireRange = that.getFireRange;
                that.api.inRange = that.inRange;
                that.api.fire = that.fire;
                that.api.enemiesInRange = that.enemiesInRange;

                return that;
            };

            /**
             * @constructor
             */
            var SpaceCraft = function (spec) {
                var that = {};

                that.health = scope.health = spec.health;

                // Если не заданы x, y проставляем рандомные значения мира
                // Координаты корабля (спрайта)
                var x = spec.x || game.world.randomX;
                var y = spec.y || game.world.randomY;

                // Создаем спрайт
                var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

                sprite.name = idGeneratorSpaceCraft + 1;

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

                that.addHealth = function (add) {
                    that.health += add;
                    scope.$apply();
                };

                that.weapon = Weapon({
                    sprite: sprite,
                    damage: 10,
                    fireRate: 500,
                    fireRange: 300,
                    velocity: 400,
                    spriteName: 'greenBeam'
                });

                that.update = function () {
                    var bonus = world.api.getBonuses();
                    bonus.forEach(function (b) {

                        var bonusTake = function(spaceCraft,bonus)
                        {
                            if (b.sprite) {
                                b.sprite.destroy();
                                b.destroy();

                                b.name.addHealth(spaceCraft);
                            }
                        };

                        b.sprite.body.collides(bonusCollisionGroup, bonusTake, null, this);
                    });

                };

                that.getId = function () {
                    return sprite.name;
                };

                that.regeneration = function () {
                    that.health += 5;
                    scope.$apply();
                };

                that.rotateLeft = function () {
                    sprite.body.rotateLeft(1);
                };

                that.rotateRight = function () {
                    sprite.body.rotateRight(1);
                };

                /**
                 * Поворот к объекту.
                 *
                 * @param another - объект
                 * @returns {boolean} true/false - совершил поворот / не совершил
                 */
                that.rotateTo = function (another) {
                    var angle = that.angleBetween(another);

                    // Угол меньше 20 - не делаем поворот
                    if (Math.abs(angle) > 20) {
                        if (angle > 0) {
                            that.rotateLeft();
                        }
                        else {
                            that.rotateRight();
                        }

                        return true;
                    }
                    else {
                        return false;
                    }
                };

                that.moveForward = function () {
                    sprite.body.moveForward(20);
                };

                that.moveBackward = function () {
                    sprite.body.moveBackward(20);
                };

                that.hit = function (damage) {
                    that.health -= damage;
                    if (that.health <= 0) {
                        // Создание нового бонуса и занесение его в bonusArray
                        world.pushBonus(Bonus({
                            sprite: 'bonus1',
                            x: sprite.body.x,
                            y: sprite.body.y,
                            angle: game.rnd.angle()
                        }));

                        world.removeEnemy(this);
                        sprite.body.destroy();
                        sprite.kill();

                        var boomSprite = game.add.sprite(that.sprite.x, that.sprite.y, 'explosion');

                        boomSprite.anchor.x = 0.5;
                        boomSprite.anchor.y = 0.5;

                        // массив это то какие кадры использовать и в какой последовательности
                        boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

                        // вторая констатна это количество кадров в секунду при воспроизвелении анимации
                        boomSprite.play('boom', 16, false, true);
                    }
                };

                that.getHealth = function () {
                    return that.health;
                };

                that.getX = function () {
                    return sprite.x;
                };

                that.getY = function () {
                    return sprite.y;
                };

                that.getAngle = function () {
                    return sprite.body.angle;
                };

                that.angleBetween = function (another) {
                    // Угол линии от точки к точке в пространстве.
                    var a = Phaser.Math.angleBetween(sprite.x, sprite.y, another.getX(), another.getY());

                    return that.api.getAngle() - Phaser.Math.radToDeg(a);
                };

                that.distance = function (another) {
                    var p = new Phaser.Point(another.getX(), another.getY());

                    return Phaser.Point.distance(sprite, p);
                };

                // Переносим на верхний слой, перед лазерами.
                sprite.bringToTop();

                // Сообщаем angualrJS об изменениях
                scope.$apply();

                that.api = {};
                that.api.weapon = that.weapon;
                that.api.getHealth = that.getHealth;
                that.api.getX = that.getX;
                that.api.getY = that.getY;
                that.api.getAngle = that.getAngle;
                that.api.angleBetween = that.angleBetween;
                that.api.distance = that.distance;

                return that;
            };

            /**
             * @constructor
             */
            var EnemySpaceCraft = function (spec) {
                var that = SpaceCraft(spec),
                    enemiesInRange = function () {
                        var a = [];

                        world.getAllUnits().forEach(function (u) {
                            if (u !== that) {
                                if (Phaser.Point.distance(that.sprite, u.sprite) < that.weapon.fireRange) {
                                    a.push(u.api);
                                }
                            }
                        });

                        return a;
                    };

                that.update = function () {
                    var enemy = enemiesInRange()[0];

                    that.weapon.update();

                    if (enemy) {
                        that.weapon.fire(enemy);
                    }
                    else {
                        var min = Number.MAX_VALUE;

                        world.getAllUnits().forEach(function (e) {
                            if (e !== that) {
                                var distance = that.distance(e);

                                if (distance < min) {
                                    min = distance;
                                    enemy = e;
                                }
                            }
                        });

                        if (enemy) {
                            if (that.rotateTo(enemy)) {
                                that.moveForward();
                            }

                            if (that.weapon.inRange(enemy)) {
                                that.weapon.fire(enemy);
                            }
                        }
                    }
                };

                return that;
            };

            /**
             * @constructor
             */
            var UserSpaceCraft = function (spec) {
                var that = SpaceCraft(spec);
                var sprite = that.sprite;
                var weapon = that.weapon;

                that.regeneration = function () {
                    that.health += 5;
                    scope.$apply();
                };

                that.api.rotateLeft = that.rotateLeft;
                that.api.rotateRight = that.rotateRight;
                that.api.rotateTo = that.rotateTo;
                that.api.moveForward = that.moveForward;
                that.api.moveBackward = that.moveBackward;

                return that;
            };

            function runUserScript() {
                if (isRunning) {
                    userObject.run(spaceCraft.api, world.api);
                }
            }

            function preload() {
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

            function create() {
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

                spaceCraft = UserSpaceCraft({
                    x: game.world.centerX,
                    y: game.world.centerY,
                    spriteName: 'spaceCraft',
                    health: 100
                });

                for (var i = 0; i < 20; i++) {
                    var e = EnemySpaceCraft({
                        spriteName: 'spaceCraft' + randomInt(1, 2),
                        health: 100,
                        angle: game.rnd.angle()
                    });

                    world.pushEnemy(e);
                }

                game.camera.follow(spaceCraft.sprite);
                game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
                game.camera.focusOn(spaceCraft.sprite);

                cursors = game.input.keyboard.createCursorKeys();
            }

            function update() {
                var enemies = world.getEnemies();

                enemies.forEach(function (e) {
                    e.update();
                });

                spaceCraft.weapon.update();

                runUserScript();
            }

            function render() {
                var zone = game.camera.deadzone;

                game.context.fillStyle = 'rgba(255,255,255,0.1)';
                game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

                game.debug.cameraInfo(game.camera, 32, 32);
                game.debug.spriteCoords(spaceCraft.sprite, 32, 500);
            }

            scope.$watch('code', function (n) {
                userCode = n;
            });

            scope.$watch('isRunning', function (n) {
                isRunning = n;

                if (n) {
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
