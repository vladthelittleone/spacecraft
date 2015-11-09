/**
 * Created by vladthelittleone on 21.10.15.
 */
/**
 * @constructor
 */
var SpaceCraft = function (spec)
{
    var that = GameObject({
        type: SCG.world.spaceCraftType
    });

    var game = SCG.game;

    var shield, health;

    var maxHealth = health = spec.health;
    var maxShield = shield = spec.shield;

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
    var shieldSprite = game.make.sprite(0, 0, 'shield');

    sprite.name = that.getId();

    var isAlive = true;

    // Центрирование
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    shieldSprite.anchor.x = 0.5;
    shieldSprite.anchor.y = 0.5;

    // Включаем проверку на коллизии с границей
    sprite.checkWorldBounds = true;

    // Подключаем физику тел к кораблю
    game.physics.p2.enable(sprite);

    //  Добавляем группу коллизий
    sprite.body.setCollisionGroup(SCG.spaceCraftCollisionGroup);
    sprite.body.collides(SCG.bonusCollisionGroup);

    // Поварачиваем корабль на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

    sprite.addChild(shieldSprite);

    var regenerationModule = that.regenerationModule = RegenerationModule({
        modulesManager: modulesManager,
        values: [2, 4, 6, 8],
        energyPoints: 2
    });

    var moveSpeedModule = that.moveSpeedModule = MoveSpeedModule({
        modulesManager: modulesManager,
        values: [10, 20, 30, 40],
        energyPoints: 2
    });

    that.weapon = Weapon({
        spaceCraft: that,
        modulesManager: modulesManager,
        velocity: 400,
        spriteName: 'greenBeam'
    });

    that.addHealth = function (add)
    {
        health += add;
        maxHealth += add;
    };

    that.addShield = function (add)
    {
        shield += add;
        maxShield += add;
    };

    that.update = function ()
    {
        that.weapon.update();
        that.healthRegeneration();
        that.shieldRegeneration();

        strategy && strategy(that);
    };

    that.healthRegeneration = function ()
    {
        health = regeneration(maxHealth, health);
    };

    that.shieldRegeneration = function()
    {
        if (health >= maxHealth)
        {
            shieldSprite.visible = true;
            shield = regeneration(maxShield, shield);
        }
    };

    function regeneration(maxValue, value)
    {
        var deltaTime = game.time.elapsed / 1000;
        var deltaRegen = regenerationModule.getRegeneration() * deltaTime;

        if((maxValue - value) > deltaRegen)
        {
            return (value + deltaRegen);
        }
        else
        {
            return maxValue;
        }
    }

    that.rotateLeft = function ()
    {
        sprite.body.rotateLeft(moveSpeedModule.getEnergyPoints());
    };

    that.rotateRight = function ()
    {
        sprite.body.rotateRight(moveSpeedModule.getEnergyPoints());
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
        sprite.body.moveForward(moveSpeedModule.getMoveSpeed());
    };

    that.moveBackward = function ()
    {
        sprite.body.moveBackward(moveSpeedModule.getMoveSpeed() / 2);
    };

    that.changeStatus = function ()
    {
        that.live = false;
    };

    that.isAlive = function ()
    {
        return isAlive;
    };

    that.removeShield = function (delta)
    {
        shield -= delta;
    };
    
    that.hit = function (damage, damageCraft)
    {
        if(shield > 0)
        {
            shield -= damage;

            // если щит сломался, то в нем окажется отрицательное значение,
            // которое прибавлем к текущему здоровью
            if(shield <= 0)
            {
                shieldSprite.visible = false;
                health += shield;
                shield = 0;
            }
        }
        else
        {
            health -= damage;
        }

        if (health <= 0)
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

            var boomSprite = game.add.sprite(that.sprite.x, that.sprite.y, 'explosion');

            boomSprite.anchor.x = 0.5;
            boomSprite.anchor.y = 0.5;

            // массив это то какие кадры использовать и в какой последовательности
            boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

            // вторая констатна это количество кадров в секунду при воспроизвелении анимации
            boomSprite.play('boom', 16, false, true);
            damageCraft.statistic.addKillEnemy();

            isAlive = false;

            if (SCG.spaceCraft.getId() === that.getId())
        {
            statistic.calculateTotalScore();
            SCG.stop();
        }

            sprite.reset(game.world.randomX, game.world.randomY);
            health = maxHealth;
            shield = maxShield;
        }
    };

    that.reset = function ()
    {
        isAlive = true;
    };

    that.getHealth = function ()
    {
        return Math.floor(health);
    };

    that.getShield = function ()
    {
        return Math.floor(shield);
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
