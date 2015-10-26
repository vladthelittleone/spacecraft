/**
* Created by vladthelittleone on 26.10.15.
*/

var RocketSkill = function (spec)
{
    var that = {};

    var spriteName = spec.spriteName;
    var fireRate = spec.fireRate;
    var spaceCraft = spec.spaceCraft;
    var speed = spec.speed;
    var fireRange = spec.fireRange;
    var cost = spec.cost;
    var damage = spec.damage;
    var sprite = spaceCraft.sprite;
    var fireTime = 0;

    var pairs = [];

    // Объявляем группу коллизий.
    //var rocketCollisionGroup = SCG.game.physics.p2.createCollisionGroup();

    function accelerateToObject(pair)
    {
        var rocket = pair.rocket;
        var enemy = pair.enemy;

        if (!speed)
        {
            speed = 60;
        }

        var angle = Math.atan2(enemy.getY() - rocket.y, enemy.getX() - rocket.x);
        rocket.body.rotation = angle - (Math.PI / 2);

        rocket.body.force.x = Math.cos(angle) * speed;
        rocket.body.force.y = Math.sin(angle) * speed;
    }

    that.getFireRate = function ()
    {
        return fireRate;
    };

    that.getFireRange = function ()
    {
        return fireRange;
    };

    that.getCost = function ()
    {
        return spaceCraft.getShield() * cost;
    };

    that.fire = function (enemy)
    {
        // Проверка вышел ли  снаряд за range ружия
        if (that.inRange(enemy))
        {
            if (SCG.game.time.now > fireTime)
            {
                spaceCraft.removeShield(Math.floor(spaceCraft.getShield() * cost));

                var rocket = SCG.game.add.sprite(sprite.body.x, sprite.body.y, spriteName);

                SCG.game.physics.p2.enable(rocket);

                //rocket.body.setCollisionGroup(rocketCollisionGroup);
                //rocket.body.collides(SCG.spaceCraftCollisionGroup);

                pairs.push({
                    rocket: rocket,
                    enemy: enemy
                });

                fireTime = SCG.game.time.now + fireRate;
            }
        }
    };

    that.update = function ()
    {

        pairs.forEach(accelerateToObject);

        //var units = SCG.world.getSpaceCrafts(spaceCraft.getId());
        //
        //units.forEach(function (u)
        //{
        //    // Callback при коллизии пули с кораблем
        //    var rocketHit = function (unit, rocket)
        //    {
        //        if (rocket.sprite)
        //        {
        //            pairs.forEach(function (e)
        //            {
        //                if (e.rocket = rocket)
        //                {
        //                    pairs.removeElement(e);
        //                }
        //            });
        //
        //            rocket.sprite.destroy();
        //            rocket.destroy();
        //
        //            var damage = spaceCraft.weapon.getDamage() * 2;
        //
        //            // Наносим урон
        //            u.hit(damage, spaceCraft);
        //            spaceCraft.statistic.addAcceptDamage();
        //            u.statistic.addTakenDamage(damage);
        //
        //        }
        //    };
        //
        //    u.sprite.body.collides(rocketCollisionGroup, rocketHit);
        //});
    };

    that.enemiesInRange = function (callback)
    {
        var a = [];

        SCG.world.getSpaceCrafts(spaceCraft.getId()).forEach(function (e)
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

    that.inRange = function (another)
    {
        return spaceCraft.distance(another) < fireRange;
    };

    return that;
};
