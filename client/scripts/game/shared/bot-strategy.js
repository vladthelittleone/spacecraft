botStrategy = function (spaceCraft, world)
{
    var a = [];

    world.getSpaceCrafts().forEach(function (u)
    {
        if (u !== spaceCraft)
        {
            if (Phaser.Point.distance(spaceCraft.sprite, u.sprite) < spaceCraft.weapon.fireRange)
            {
                a.push(u.api);
            }
        }
    });

    var enemy = a[0];

    spaceCraft.weapon.update();

    if (enemy)
    {
        spaceCraft.weapon.fire(enemy);
    }
    else
    {
        var min = Number.MAX_VALUE;

        world.getSpaceCrafts().forEach(function(e)
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
