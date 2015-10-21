/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var Weapon = function (spec)
{
    var that = {},
        sprite = spec.sprite,
        damage = spec.damage,
        fireRate = spec.fireRate,
        fireRange = spec.fireRange,
        spriteName = spec.spriteName,
        velocity = spec.velocity,
        fireTime = 0;

    // Объявляем группу коллизий.
    var beamsCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

    //  Группа пуль.
    var beams = SCG.game.add.group();

    // Массив выпущенных снарядов
    var beamsArray = [];

    beams.setAll('anchor.x', 0.5);
    beams.setAll('anchor.y', 0.5);
    beams.setAll('outOfBoundsKill', true);
    beams.setAll('checkWorldBounds', true);

    beams.enableBody = true;
    beams.physicsBodyType = Phaser.Physics.P2JS;

    that.addDamage = function (add)
    {
        damage += add;
    };

    that.update = function ()
    {
        var units = SCG.world.getSpaceCrafts();

        // Проходимся по всем снарядам выпущенным кораблем
        beamsArray.forEach(function (b, i)
        {
            // Проверка вышел ли  снаряд за range ружия
            if (Phaser.Point.distance(sprite, b) > fireRange)
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

        units.forEach(function (u)
        {
            // Не наносим урон себе
            if (sprite !== u.sprite)
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
                        beam.sprite.destroy();
                        beam.destroy();

                        // Наносим урон
                        u.hit(damage);
                    }
                };

                u.sprite.body.collides(beamsCollisionGroup, beamHit);
            }
        });
    };

    that.getDamage = function ()
    {
        return damage;
    };

    that.getFireRate = function ()
    {
        return fireRate;
    };

    that.getFireRange = function ()
    {
        return fireRange;
    };

    that.inRange = function (another)
    {
        var p = new Phaser.Point(another.getX(), another.getY());

        return Phaser.Point.distance(sprite, p) < fireRange;
    };

    that.fire = function (obj1, obj2)
    {
        var x = obj1,
            y = obj2;

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

                fireTime = SCG.game.time.now + fireRate;
            }
        }
    };

    that.enemiesInRange = function (id, callback)
    {
        var a = [];

        SCG.world.getSpaceCrafts(id).forEach(function (e)
        {
            if (Phaser.Point.distance(sprite, e.sprite) < fireRange)
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

    return that;
};
