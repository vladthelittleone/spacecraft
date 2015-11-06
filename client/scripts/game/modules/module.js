/**
 * Created by vladthelittleone on 06.11.15.
 */
var Module = function (spec)
{
    var that = {};

    var manager = spec.modulesManager;
    var energyPoints = manager.getPoints(spec.energyPoints) || 0;

    that.inc = function (i)
    {
        var delta;

        if (i)
        {
            energyPoints =+ manager.getPoints(i);
        }
        else
        {
            energyPoints =+ manager.getPoints(1);

        }
    };

    that.dec = function (i)
    {
        var delta;

        if (i)
        {
            delta = energyPoints - i;

            if (delta >= 0)
            {
                manager.addToFreePoints(i);
                energyPoints = delta;
            }
        }
        else
        {
            delta = energyPoints - 1;

            if (delta >= 0)
            {
                manager.addToFreePoints(1);
                energyPoints = delta;
            }
        }
    };

    that.getEnergyPoints = function ()
    {
        return energyPoints;
    };

    return that;
};

var RateModule = function (spec)
{
    var that = Module(spec);

    var fireRate = spec.fireRate;

    that.getFireRate = function ()
    {
        return fireRate * that.getEnergyPoints();
    };

    return that;
};

var RangeModule = function (spec)
{
    var that = Module(spec);

    var fireRange = spec.fireRange;

    that.getFireRange = function ()
    {
        return fireRange * that.getEnergyPoints();
    };

    return that;
};

var DamageModule = function (spec)
{
    var that = Module(spec);

    var damage = spec.damage;

    that.getDamage = function ()
    {
        return damage * that.getEnergyPoints();
    };

    that.addDamage = function (add)
    {
        damage += add;
    };

    return that;
};
