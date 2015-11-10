'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 */

/**
 * @constructor
 */
var WorldApi = function (world, id)
{
    var api = {};

    function get(callback, func, api)
    {
        var a = [];

        func(id).forEach(function (e, i, arr)
        {
            var apiElement = api(e);
            a.push(apiElement);

            if (callback)
            {
                callback(apiElement, i, arr);
            }
        });

        return a;
    }

    api.getBounds = world.getBounds;

    api.getEnemies = function (callback)
    {
        return get(callback, world.getSpaceCrafts, EnemyApi);
    };

    // Получить массив бонусов
    api.getBonuses = function (callback)
    {
        return get(callback, world.getBonuses, BonusApi);
    };

    return api;
};

/**
 * @constructor
 */
var BonusApi = function (bonus)
{
    var api = {};

    api.getY = bonus.getY;
    api.getX = bonus.getX;
    api.getId = bonus.getId;
    api.getType = bonus.getBonusType;

    return api;
};

/**
 * @constructor
 */
var SpaceCraftApi = function (spaceCraft)
{
    var api = {};

    api.weapon = api.w = WeaponApi(spaceCraft.weapon);

    api.getId = spaceCraft.getId;

    api.getHealth = spaceCraft.getHealth;
    api.getShield = spaceCraft.getShield;

    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;

    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.rotateLeft = spaceCraft.rotateLeft;
    api.rotateRight = spaceCraft.rotateRight;
    api.rotateTo = spaceCraft.rotateTo;

    api.distance = spaceCraft.distance;
    api.moveForward = spaceCraft.moveForward;
    api.moveBackward = spaceCraft.moveBackward;
    api.moveTo = spaceCraft.moveTo;
    api.moveToNearestBonus = spaceCraft.moveToNearestBonus;

    var modules = api.modules = api.m = {
        rate: ModuleApi(spaceCraft.weapon.rateModule),
        range: ModuleApi(spaceCraft.weapon.rangeModule),
        damage: ModuleApi(spaceCraft.weapon.dmgModule),
        regen: ModuleApi(spaceCraft.regenerationModule),
        moveSpeed: ModuleApi(spaceCraft.moveSpeedModule)
    };

    api.incRegen = modules.regen.inc;
    api.incDamage = modules.damage.inc;
    api.incRange = modules.range.inc;
    api.incRate = modules.rate.inc;
    api.incMoveSpeed = modules.moveSpeed.inc;

    api.decRegen = modules.regen.dec;
    api.decMoveSpeed = modules.moveSpeed.dec;
    api.decRate = modules.rate.dec;
    api.decRange = modules.range.dec;
    api.decDamage = modules.damage.dec;

    api.getRegenEnergy = modules.regen.getEnergyPoints;
    api.getMoveSpeedEnergy = modules.moveSpeed.getEnergyPoints;
    api.getRateEnergy = modules.rate.getEnergyPoints;
    api.getRangeEnergy = modules.range.getEnergyPoints;
    api.getDamageEnergy = modules.damage.getEnergyPoints;

    api.getFreePoints = spaceCraft.modulesManager.getFreePoints;
    api.getMaxPoints = spaceCraft.modulesManager.getMaxPoints;

    return api;
};

/**
 * @constructor
 */
var WeaponApi = function (weapon)
{
    var api = {};

    api.getDamage = weapon.getDamage;
    api.getFireRate = weapon.getFireRate;
    api.getFireRange = weapon.getFireRange;
    api.inRange = weapon.inRange;
    api.fire = weapon.fire;
    api.enemiesInRange = weapon.enemiesInRange;
    api.fireNearestEnemy = weapon.fireNearestEnemy;

    return api;
};

/**
 * @constructor
 */
var ModuleApi = function (module)
{
    var api = {};

    api.inc = module.inc;
    api.dec = module.dec;
    api.getEnergyPoints = module.getEnergyPoints;
    api.getMax = module.getMax;

    return api;
};

/**
 * @constructor
 */
var EnemyApi = function (spaceCraft)
{
    var api = {};

    api.weapon = EnemyWeaponApi(spaceCraft.weapon);
    api.getHealth = spaceCraft.getHealth;
    api.getShield = spaceCraft.getShield;
    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;
    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.distance = spaceCraft.distance;
    api.getId = spaceCraft.getId;

    return api;
};

/**
 * @constructor
 */
var EnemyWeaponApi = function (weapon)
{
    var api = {};

    api.getDamage = weapon.getDamage;
    api.getFireRate = weapon.getFireRate;
    api.getFireRange = weapon.getFireRange;

    return api;
};
