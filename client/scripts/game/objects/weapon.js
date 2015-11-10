'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var Weapon = function (spec)
{
    var that = {},
        spaceCraft = spec.spaceCraft,
        sprite = spaceCraft.sprite,
        spriteName = spec.spriteName,
        velocity = spec.velocity,
        fireTime = 0;

    // Объявляем группу коллизий.
    var beamsCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

    //  Группа пуль.
    var beams = SCG.game.add.group();

    // Массив выпущенных снарядов
    var beamsArray = [];


    // Модули
    var rangeModule = that.rangeModule = RangeModule({
        modulesManager: spec.modulesManager,
        values: [100, 150, 200, 250],
        energyPoints: 3
    });

    var rateModule = that.rateModule = RateModule({
        modulesManager: spec.modulesManager,
        values: [650, 600, 550, 500],
        energyPoints: 3
    });

    var dmgModule = that.dmgModule = DamageModule({
        modulesManager: spec.modulesManager,
        values: [5, 10, 15, 20],
        energyPoints: 2
    });


    beams.setAll('anchor.x', 0.5);
    beams.setAll('anchor.y', 0.5);
    beams.setAll('outOfBoundsKill', true);
    beams.setAll('checkWorldBounds', true);

    beams.enableBody = true;
    beams.physicsBodyType = Phaser.Physics.P2JS;

    that.addDamage = function (add)
    {
        dmgModule.addDamage(add);
    };

    that.update = function ()
    {
        // Проходимся по всем снарядам выпущенным кораблем
        beamsArray.forEach(function (b, i)
        {
            // Проверка вышел ли  снаряд за range ружия
            if (Phaser.Point.distance(sprite, b) > rangeModule.getFireRange())
            {
                if (b.body)
                {
                    // Уничтожаем спрайт снаряда и удаляем его из массива снарядов
                    b.body.destroy();
                    b.destroy();
                    beamsArray.removeElementByIndex(i);
                }
            }
        });

        var units = SCG.world.getSpaceCrafts(spaceCraft.getId());

        units.forEach(function (u)
        {
            // Callback при коллизии пули с кораблем
            var beamHit = function (unit, beam)
            {
                /**
                 * Уничтожаем пулю
                 *
                 * TODO
                 * Странная проверка, так как мы удаляем body,
                 * но все равно вызывается beamHit
                 */
                if (beam.sprite)
                {
                    if (!utils.randomInt(0, 3))
                    {
                        Explosion(beam.sprite.x, beam.sprite.y, 0.3);
                    }

                    beam.sprite.destroy();
                    beam.destroy();

                    // Наносим урон
                    u.hit(dmgModule.getDamage(), spaceCraft);
                    spaceCraft.statistic.addAcceptDamage(spaceCraft.weapon.getDamage());
                    u.statistic.addTakenDamage(dmgModule.getDamage());

                }
            };

            u.sprite.body.collides(beamsCollisionGroup, beamHit);
        });
    };

    that.getDamage = function ()
    {
        return dmgModule.getDamage();
    };

    that.getFireRate = function ()
    {
        return rateModule.getFireRate();
    };

    that.getFireRange = function ()
    {
        return rangeModule.getFireRange();
    };

    that.inRange = function (another)
    {
        return spaceCraft.distance(another) < rangeModule.getFireRange();
    };

    that.fire = function (obj1, obj2)
    {
        var x = obj1,
            y = obj2;

        // Если урон или скорострельность, диапозон равен нулю, не стреляем.
        if (!rateModule.getFireRate() ||
            !rangeModule.getFireRange() ||
            !dmgModule.getDamage())
        {
            return;
        }

        // Проверка делэя. Не стреляем каждый фрэйм.
        if (SCG.game.time.now > fireTime)
        {
            var beam = beams.create(sprite.body.x, sprite.body.y, spriteName);

            // Добавляем выпущенный снаряд в массив снарядов
            beamsArray.push(beam);

            beam.body.collideWorldBounds = false;

            // Устанавливаем маленькую массу,
            // что б при столкновении с пулей
            // кораблик не взаимодействовал с ней.
            beam.body.mass = 0.00001;

            beam.body.setCollisionGroup(beamsCollisionGroup);
            beam.body.collides(SCG.spaceCraftCollisionGroup);

            if (beam)
            {
                if (!x && !y)
                {
                    // Поворот пули по направлению корабля
                    beam.body.rotation = sprite.body.rotation - (Math.PI / 2);
                }
                else
                {
                    // Првоерка на объект.
                    // Если есть x, y то это объект,
                    // например корабль
                    if ((typeof obj1.getX === 'function') && (typeof obj1.getY === 'function'))
                    {
                        x = obj1.getX();
                        y = obj1.getY();
                    }

                    // Поворот пули по x, y
                    beam.body.rotation = Math.atan2(y - beam.y, x - beam.x);
                }

                var angle = beam.body.rotation;

                beam.body.velocity.x = velocity * Math.cos(angle);
                beam.body.velocity.y = velocity * Math.sin(angle);

                fireTime = SCG.game.time.now + rateModule.getFireRate();
            }
        }
    };

    that.enemiesInRange = function (callback)
    {
        var a = [];

        SCG.world.getSpaceCrafts(spaceCraft.getId()).forEach(function (e)
        {
            if (Phaser.Point.distance(sprite, e.sprite) < rangeModule.getFireRange())
            {
                a.push(SpaceCraftApi(e));
            }
        });

        if (callback)
        {
            a.forEach(function (e, i, arr)
            {
                callback(e, i, arr);
            })
        }

        return a;
    };

    that.fireNearestEnemy = function()
    {
        var enemy;
        var eMin = Number.MAX_VALUE;

        that.enemiesInRange(function (e)
        {
            var distance = spaceCraft.distance(e);

            if (distance < eMin)
            {
                eMin = distance;
                enemy = e;
            }
        });

        that.fire(enemy);
    };

    return that;
};
