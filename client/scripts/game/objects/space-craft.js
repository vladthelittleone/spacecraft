'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var SpaceCraft = function (spec)
{
    var that = GameObject({
        type: SCG.world.spaceCraftType
    });

    var game = SCG.game;

    var statistic = that.statistic = Statistic();
    var modulesManager = that.modulesManager = ModulesManager({
        energyPoints: 12
    });

    // Стратегия, которая будет использоваться
    // для бота, либо игроква
    var strategy = spec.strategy;

    // Если не заданы x, y проставляем рандомные значения мира
    // Координаты корабля (спрайта)
    var x = spec.x || game.world.randomX;
    var y = spec.y || game.world.randomY;

    // Создаем спрайт
    var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

    sprite.name = that.getId();

    var isAlive = true;

    // Центрирование
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    // Включаем проверку на коллизии с границей
    sprite.checkWorldBounds = true;

    // Подключаем физику тел к кораблю
    game.physics.p2.enable(sprite);

    //  Добавляем группу коллизий
    sprite.body.setCollisionGroup(SCG.spaceCraftCollisionGroup);
    sprite.body.collides(SCG.bonusCollisionGroup);

    // Поварачиваем корабль на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

    var engine = that.engine = EngineModule({
        modulesManager: modulesManager,
        spaceCraft: that
    });

    var defense = that.defense = DefenseModule({
        sprite: sprite,
        health: spec.health,
        shield: spec.shield,
        modulesManager: modulesManager
    });

    var weapon = that.weapon = WeaponModule({
        spaceCraft: that,
        modulesManager: modulesManager,
        velocity: 400,
        spriteName: 'greenBeam'
    });

    that.update = function ()
    {
        that.weapon.update();
        defense.healthRegeneration();
        defense.shieldRegeneration();

        strategy && strategy(that);
    };

    that.changeStatus = function ()
    {
        that.live = false;
    };

    that.isAlive = function ()
    {
        return isAlive;
    };

    that.hit = function (damage, damageCraft)
    {
        if(defense.getShield() > 0)
        {
            defense.subShield(damage);

            // если щит сломался, то в нем окажется отрицательное значение,
            // которое прибавлем к текущему здоровью
            if(defense.getShield() <= 0)
            {
                defense.addHealth(defense.getShield());
                defense.setShield(0);
            }
        }
        else
        {
            defense.subHealth(damage);
        }

        if (defense.getHealth() <= 0)
        {
            var bonusType = generateBonus({
                health: 10,
                damage: 10,
                shield: 10
            });

            // Создание нового бонуса и занесение его в bonusArray
            utils.random() && Bonus({
                bonusType: bonusType,
                x: sprite.body.x,
                y: sprite.body.y,
                angle: game.rnd.angle()
            });

            Explosion(that.sprite.x, that.sprite.y);

            damageCraft.statistic.addKillEnemy();

            isAlive = false;

            if (SCG.spaceCraft.getId() === that.getId())
            {
                statistic.calculateTotalScore();
                SCG.stop();
            }

            var modX = SCG.world.getBounds().height - 320;
            var modY = SCG.world.getBounds().width - 320;

            var nx = game.world.randomX % modX + 200;
            var ny = game.world.randomY % modY + 200;

            sprite.reset(nx, ny);

            defense.setHealth(defense.getMaxHealth());
            defense.setShield(defense.getMaxShield());
        }
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

    // Добавляем наш корабль в мир
    SCG.world.pushObject(that);

    return that;
};
