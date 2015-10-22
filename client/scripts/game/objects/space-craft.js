/**
 * Created by vladthelittleone on 21.10.15.
 */
/**
 * @constructor
 */
var SpaceCraft = function (spec)
{
    var that = {};

    var game = SCG.game;
    
    var maxHealth = that.health = spec.health;
    var shield = maxShield = spec.shield;
    var shieldIsAlive = true;

    // Стратегия, которая будет использоваться
    // для бота, либо игроква
    var strategy = spec.strategy;

    // Если не заданы x, y проставляем рандомные значения мира
    // Координаты корабля (спрайта)
    var x = spec.x || game.world.randomX;
    var y = spec.y || game.world.randomY;

    // Создаем спрайт
    var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);
    var id = sprite.name = spec.id;

    // Центрирование
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    // Включаем проверку на коллизии с границей
    sprite.checkWorldBounds = true;

    // Подключаем физику тел к кораблю
    game.physics.p2.enable(sprite, true);

    //  Добавляем группу коллизий
    sprite.body.setCollisionGroup(SCG.spaceCraftCollisionGroup);
    sprite.body.collides(SCG.bonusCollisionGroup);

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
    };

    that.update = function ()
    {
        strategy(that);
    };

    that.regeneration = function ()
    {
        regeneration(maxHealth, that.health);
    };

    that.regenerationShield = function() {
        regeneration(maxShield, shield);
        shieldIsAlive = true;
    }

    function regeneration(maxValue, value)
    {
        if((maxValue - value) <= 5)
        {
            value = maxValue;
        }
        else
        {
            value += 5;
        }
    }

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
        if(shieldIsAlive)
        {
            shield -= damage;
            if(shield <= 0)
            {
                shieldIsAlive = false;
                that.health += shield;
                shield = 0;
            }
        }
        else
        {
            that.health -= damage;
        }

        if (that.health <= 0)
        {
            // Создание нового бонуса и занесение его в bonusArray
            SCG.world.pushBonus(Bonus({
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

    return that;
};
