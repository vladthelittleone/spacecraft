botStrategy = function (spaceCraft)
{
    var enemy =  spaceCraft.weapon.enemiesInRange(spaceCraft.getId())[0];

    spaceCraft.weapon.update();

    if (enemy)
    {
        spaceCraft.weapon.fire(enemy);
    }
    else
    {
        var bonus = {};

        var eMin = Number.MAX_VALUE;
        var bMin = Number.MAX_VALUE;

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

        SCG.world.getBonuses().forEach(function(b)
        {
            var distance = spaceCraft.distance(b);

            if (distance < bMin)
            {
                bMin = distance;
                bonus = b;
            }
        });

        if (bMin < eMin)
        {
            if(spaceCraft.rotateTo(bonus))
            {
                spaceCraft.moveForward();
            }
        }
        else
        {
            if (enemy)
            {
                if(spaceCraft.rotateTo(enemy))
                {
                    spaceCraft.moveForward();
                }

                if (spaceCraft.weapon.inRange(enemy))
                {
                    spaceCraft.weapon.fire(enemy);
                }
            }
        }
    }
};
