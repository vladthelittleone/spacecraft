/**
 * Created by vladthelittleone on 06.11.15.
 */
var Module = function (spec)
{
    var that = {};

    var manager = spec.modulesManager;
    var max = spec.max;

    var energyPoints = manager.getPoints(spec.energyPoints) || 0;

    that.inc = function (i)
    {
        var range = max - energyPoints;
        var points = 1 > range ? 0 : 1;

        if (i)
        {
            points = i > range ? range : i;
        }

        energyPoints += manager.getPoints(points);
    };

    that.dec = function (i)
    {
        function decOn(num)
        {
            var delta = energyPoints - num;

            if (delta >= 0)
            {
                manager.addToFreePoints(num);
                energyPoints = delta;
            }
            else
            {
                manager.addToFreePoints(energyPoints);
                energyPoints = 0;
            }
        }

        if (i)
        {
            decOn(i);
        }
        else
        {
            decOn(1);
        }
    };

    that.getMax = function ()
    {
        return max;
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
        return fireRate / that.getEnergyPoints();
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

var RegenerationModule = function (spec)
{
    var that = Module(spec);

    var regen = spec.regen;

    that.getRegeneration = function ()
    {
        return regen * that.getEnergyPoints();
    };

    return that;
};

var MoveSpeedModule = function (spec)
{
    var that = Module(spec);

    var moveSpeed = spec.moveSpeed;

    that.getConstantMoveSpeed = function ()
    {
        return moveSpeed;
    };

    that.getMoveSpeed = function ()
    {
        return moveSpeed * that.getEnergyPoints();
    };

    return that;
};
