'use strict';

var botStrategy = function (spaceCraft)
{
    var enemy =  spaceCraft.weapon.enemiesInRange()[0];
    var bonus;

    var eMin = Number.MAX_VALUE;
    var bMin = Number.MAX_VALUE;

    function bonusInRange (range, callback)
    {
        var a = [];

        SCG.world.getBonuses().forEach(function (e)
        {
            if (Phaser.Point.distance(spaceCraft.sprite, e.sprite) < range)
            {
                a.push(BonusApi(e));
            }
        });

        if (callback)
        {
            a.forEach(function (e, i, arr)
            {
                callback(e, i, arr);
            });
        }

        return a;
    }

    function bonusGenerate()
    {
        bonusInRange(spaceCraft.weapon.getFireRange()).forEach(function (b)
        {
            var distance = spaceCraft.distance(b);

            if (distance < bMin)
            {
                bMin = distance;
                bonus = b;
            }
        });
    }

    if (enemy)
    {
        spaceCraft.weapon.fire(enemy);

        bonusGenerate();

        if (bonus)
        {
            spaceCraft.rotateTo(bonus);
            spaceCraft.moveForward();
        }
    }
    else
    {
        SCG.world.getSpaceCrafts().forEach(function(e)
        {
            if (e !== spaceCraft)
            {
                var distance = spaceCraft.distance(e);

                if (distance < eMin)
                {
                    eMin = distance;
                    enemy = e;
                }
            }
        });

        bonusGenerate();

        if (bMin < eMin)
        {
            spaceCraft.rotateTo(bonus);
            spaceCraft.moveForward();
        }
        else
        {
            if (enemy)
            {
                spaceCraft.rotateTo(enemy);
                spaceCraft.moveForward();

                if (spaceCraft.weapon.inRange(enemy))
                {
                    spaceCraft.weapon.fire(enemy);
                }
            }
        }
    }
};
