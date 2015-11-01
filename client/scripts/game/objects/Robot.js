/**
 * Created by vladthelittleone on 26.10.15.
 */

var Robot = function (spec)
{
    var that = GameObject({
        type: SCG.world.robotType
    });

    var atlasName = spec.atlasName;
    var spaceCraft = spec.spaceCraft;
    var coolDown = spec.coolDown;
    var velocity = spec.velocity;
    var detectionRange = spec.detectionRange;
    var cost = spec.cost;
    var sprite = spaceCraft.sprite;
    var fireTime = 0;
    var shieldTaken = 0;

    var botSprite;

    var robots = SCG.game.add.group();

    // Объявляем группу коллизий.
    //var robotCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

    var units = SCG.world.getSpaceCrafts(spaceCraft.getId());

    units.forEach(function (u)
    {
        // Callback при коллизии пули с кораблем
        var botBoom = function (enemy, bot)
        {
            var s = SCG.world.getSpaceCraft(enemy.sprite.name);

            if (s.getId() === spaceCraft.getId())
            {
                return;
            }

            /**
             * Уничтожаем пулю
             *
             * TODO
             * Странная проверка, так как мы удаляем body,
             * но все равно вызывается beamHit
             */
            if (bot.sprite)
            {
                var damage = 1.5 * shieldTaken;

                var boomSprite = SCG.game.add.sprite(bot.sprite.x, bot.sprite.y, 'explosion');

                boomSprite.anchor.x = 0.5;
                boomSprite.anchor.y = 0.5;

                // массив это то какие кадры использовать и в какой последовательности
                boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

                // вторая констатна это количество кадров в секунду при воспроизвелении анимации
                boomSprite.play('boom', 16, false, true);

                bot.sprite.destroy();
                bot.destroy();

                bot.sprite = null;

                // Наносим урон
                s.hit(damage, spaceCraft);
                spaceCraft.statistic.addAcceptDamage(damage);
                s.statistic.addTakenDamage(damage);
            }
        };

        //u.sprite.body.collides(robotCollisionGroup, botBoom);
    });

    function accelerateToObject(enemy)
    {
        if (!velocity)
        {
            velocity = 60;
        }

        var angle = Math.atan2(enemy.getY() - botSprite.y, enemy.getX() - botSprite.x);
        botSprite.body.rotation = angle - (Math.PI / 2);

        botSprite.body.velocity.x = Math.cos(angle) * velocity;
        botSprite.body.velocity.y = Math.sin(angle) * velocity;
    }

    that.getDetectionRange = function ()
    {
        return detectionRange;
    };

    that.getCost = function ()
    {
        return spaceCraft.getShield() * cost;
    };

    that.getCoolDown = function ()
    {
        return coolDown;
    };

    that.drop = function ()
    {
        if (!botSprite && SCG.game.time.now > fireTime)
        {
            shieldTaken = Math.floor(spaceCraft.getShield() * cost);
            spaceCraft.removeShield(shieldTaken);

            botSprite = robots.create(sprite.body.x, sprite.body.y, atlasName);
            botSprite.name = that.getId();

            botSprite.animations.add('bot');
            botSprite.animations.play('bot', 15, true);

            SCG.game.physics.p2.enable(botSprite);

            // Устанавливаем маленькую массу,
            // что б при столкновении с пулей
            // кораблик не взаимодействовал с ней.
            botSprite.body.mass = 0.00001;

            // Объявляем группу коллизий.
            //robotCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

            //botSprite.body.setCollisionGroup(robotCollisionGroup);
            //botSprite.body.collides(SCG.spaceCraftCollisionGroup);

            fireTime = SCG.game.time.now + coolDown;
        }
    };

    that.update = function ()
    {
        if (botSprite && botSprite.body)
        {
            var min = Number.MAX_VALUE;
            var enemy;

            that.enemiesInRange(function (e)
            {
                var p = new Phaser.Point(e.getX(), e.getY());
                var distance = Phaser.Point.distance(botSprite, p) < detectionRange;

                if (distance < min)
                {
                    min = distance;
                    enemy = e;
                }
            });

            if (enemy)
            {
                accelerateToObject(enemy);
            }
        }
    };

    that.enemiesInRange = function (callback)
    {
        var a = [];

        SCG.world.getSpaceCrafts(spaceCraft.getId()).forEach(function (e)
        {
            if (Phaser.Point.distance(sprite, e.sprite) < detectionRange)
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

    that.inRange = function (another)
    {
        var p = new Phaser.Point(another.getX(), another.getY());
        return Phaser.Point.distance(botSprite, p) < detectionRange;
    };

    SCG.world.push(that);

    return that;
};
