'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var World = function (spec)
{
    var that = {},
        bounds = spec.bounds,
        objects = [];

    that.spaceCraftType = 0;
    that.bonusType = 1;

    that.pushObject = function (obj)
    {
        objects.push(obj);
    };

    that.removeObject = function (obj)
    {
        objects.removeElement(obj);
    };

    that.get = function (id)
    {
        var result;

        objects.forEach(function(e)
        {
           if (e.getId() === id)
           {
               result = e;
           }
        });

        return result;
    };

    that.getObjects = function ()
    {
        return objects;
    };

    that.getSpaceCraft = function (id)
    {
        var result;

        objects.forEach(function (o)
        {
            if (o.getType() === that.spaceCraftType)
            {
                if (o.getId() === id)
                {
                    result = o;
                }
            }
        });

        return result;
    };

    that.getSpaceCrafts = function (id)
    {
        var spaceCrafts = [];

        objects.forEach(function (e)
        {
            if (e.getType() === that.spaceCraftType && e.getId() !== id)
            {
                spaceCrafts.push(e);
            }
        });

        return spaceCrafts;
    };

    that.getBounds = function ()
    {
        return bounds;
    };

    // Получить массив бонусов
    that.getBonuses = function (callback)
    {
        var bonuses = [];

        objects.forEach(function (e)
        {
            if (e.getType() === that.bonusType)
            {
                bonuses.push(e);
            }
        });

        if (callback)
        {
            bonuses.forEach(function (e, i, arr) {
                callback(e, i, arr);
            })
        }

        return bonuses;
    };

    that.update = function ()
    {
        // Проходимся по всем бонусом смотрим были ли коллизии с кораблем
        that.getBonuses(function (b)
        {
            b.update();
        });

        that.getSpaceCrafts().forEach(function (e)
        {
            e.update();
        });
    };

    return that;
};
