/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var World = function (spec)
{
    var that = {},
        spaceCrafts = spec.spaceCrafts || [],
        bounds = spec.bounds,
        bonusArray = [];

    // Положить в массив бонусов
    that.pushBonus = function (bonus)
    {
        bonusArray.push(bonus);
    };

    that.pushSpaceCraft = function (spaceCraft)
    {
        spaceCrafts.push(spaceCraft);
    };

    that.removeSpaceCraft = function (spaceCraft)
    {
        spaceCrafts.removeElement(spaceCraft);
    };

    that.getBounds = function ()
    {
        return bounds;
    };

    that.getSpaceCrafts = function (id)
    {
        if (id)
        {
            var a = [];

            spaceCrafts.forEach(function (e)
            {
                if (e.getId() !== id)
                {
                    a.push(e);
                }
            });

            return a;
        }

        return spaceCrafts;
    };

    // Получить массив бонусов
    that.getBonuses = function (callback)
    {
        if (callback)
        {
            bonusArray.forEach(function (e, i, arr) {
                callback(e, i, arr);
            })
        }

        return bonusArray;
    };

    return that;
};
