'use strict';

var botStrategy = function (spaceCraft)
{
    /**
     * Враг, к которому мы летим, либо стреляем.
     */
    var enemy =  spaceCraft.weapon.enemiesInRange()[0];

    /**
     * Бонус, к которому мы летим.
     */
    var bonus;

    var eMin = Number.MAX_VALUE;
    var bMin = Number.MAX_VALUE;

    /**
     * Возвращает бонусы в рендже.
     *
     * @param range - рендж
     * @param callback - каллбек, который мы используем для каждого бонуса.
     * @returns {Array}
     */
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
        bonusInRange(spaceCraft.weapon.getFireRange(), function (b)
        {
            // Дистанция до бонуса
            var distance = spaceCraft.distance(b);

            // Поиск минимальной дистанции
            if (distance < bMin)
            {
                bMin = distance;
                bonus = b;
            }
        });
    }

    // Если есть в раг в радиусе атаки корабля, то
    // Стреляем по нему. Ищем ближайший бонус
    if (enemy)
    {
        spaceCraft.weapon.fire(enemy);

        // Поиск ближайшего бонуса и сохранение в bonus.
        bonusGenerate();

        // Если он не нулл
        if (bonus)
        {
            // Поварачиваемся к нему и плывем
            spaceCraft.rotateTo(bonus);
            spaceCraft.moveForward();
        }
    }
    else
    {
        // Если врага в радиусе атакие нет, то ищем ближайшего врага в мире.
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

        // Поиск ближайшего бонуса и сохранение в bonus.
        bonusGenerate();

        // Если дистанция до бонуса меньше, чем до корабля, летим до бонуса.
        // Иначе плывем к врагу.
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
