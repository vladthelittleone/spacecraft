/**
 * Created by vladthelittleone on 26.10.15.
 */

var Robot = function (spec)
{
    var that = {};

    var atlasName = spec.atlasName;
    var spaceCraft = spec.spaceCraft;
    var coolDown = spec.coolDown;
    var speed = spec.speed;
    var detectionRange = spec.detectionRange;
    var cost = spec.cost;
    var sprite = spaceCraft.sprite;
    var fireTime = 0;
    var botSprite;

    var rockets = SCG.game.add.group();

    // Объявляем группу коллизий.
    //var rocketCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

    function accelerateToObject(enemy)
    {
        if (!speed)
        {
            speed = 60;
        }

        var angle = Math.atan2(enemy.getY() - botSprite.y, enemy.getX() - botSprite.x);
        botSprite.body.rotation = angle - (Math.PI / 2);

        botSprite.body.force.x = Math.cos(angle) * speed;
        botSprite.body.force.y = Math.sin(angle) * speed;
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
            spaceCraft.removeShield(Math.floor(spaceCraft.getShield() * cost));

            botSprite = rockets.create(sprite.body.x, sprite.body.y, atlasName);

            botSprite.animations.add('bot');
            botSprite.animations.play('bot', 15, true);

            SCG.game.physics.p2.enable(botSprite);

            //rocket.body.setCollisionGroup(rocketCollisionGroup);
            //rocket.body.collides(SCG.spaceCraftCollisionGroup);

            fireTime = SCG.game.time.now + coolDown;
        }
    };

    that.update = function ()
    {
        if (botSprite)
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

    return that;
};
