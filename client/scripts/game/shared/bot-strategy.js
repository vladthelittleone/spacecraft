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
        var min = Number.MAX_VALUE;

         SCG.world.getSpaceCrafts().forEach(function(e)
        {
            if (e !== spaceCraft)
            {
                var distance = spaceCraft.distance(e);

                if (distance < min)
                {
                    min = distance;
                    enemy = e;
                }
            }
        });

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
};
