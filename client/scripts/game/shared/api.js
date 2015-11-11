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

    api.weapon = api.w = WeaponBlockApi(spaceCraft.weapon);
    api.engine = api.e = EngineBlockApi(spaceCraft.engine);
    api.protection = api.p = ProtectionBlockApi(spaceCraft.protection);

    api.getId = spaceCraft.getId;

    api.getHealth = api.p.getHealth;
    api.getShield = api.p.getShield;

    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;

    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.distance = spaceCraft.distance;

    api.fire = api.w.fire;

    api.rotateLeft = api.e.rotateLeft;
    api.rotateRight = api.e.rotateRight;
    api.rotateTo = api.e.rotateTo;
    api.moveForward = api.e.moveForward;
    api.moveBackward = api.e.moveBackward;
    api.moveTo = api.e.moveTo;
    api.moveToNearestBonus = api.e.moveToNearestBonus;

    api.getFreePoints = spaceCraft.modulesManager.getFreePoints;
    api.getMaxPoints = spaceCraft.modulesManager.getMaxPoints;

    return api;
};

/**
 * @constructor
 */
var EngineBlockApi = function (engine)
{
    var api = {};

    api.moveSpeed = ModuleApi(engine.moveSpeed);

    api.rotateLeft = engine.rotateLeft;
    api.rotateRight = engine.rotateLeft;
    api.rotateTo = engine.rotateTo;
    api.moveForward = engine.moveForward;
    api.moveBackward = engine.moveBackward;
    api.moveTo = engine.moveTo;
    api.moveToNearestBonus = engine.moveToNearestBonus;

    api.incMoveSpeed = api.moveSpeed.inc;
    api.decMoveSpeed = api.moveSpeed.dec;
    api.getMoveSpeedEnergy = api.moveSpeed.getEnergyPoints;
    api.getMoveSpeed = api.moveSpeed.getMoveSpeed;

    return api;
};

/**
 * @constructor
 */
var ProtectionBlockApi = function (protection)
{
    var api = {};

    api.regeneration = ModuleApi(protection.regeneration);

    api.getHealth = protection.getHealth;
    api.getShield = protection.getShield;

    api.getRegeneration = protection.regeneration.getRegeneration;

    api.incRegen = api.regeneration.inc;
    api.decRegen = api.regeneration.dec;
    api.getRegenEnergy = api.regeneration.getEnergyPoints;

    return api;
};

/**
 * @constructor
 */
var WeaponBlockApi = function (weapon)
{
    var api = {};

    api.rate = ModuleApi(weapon.rate);
    api.damage = ModuleApi(weapon.damage);
    api.range = ModuleApi(weapon.range);

    api.getDamage = weapon.damage.getDamage;
    api.getFireRate = weapon.rate.getFireRate;
    api.getFireRange = weapon.range.getFireRange;

    api.inRange = weapon.inRange;
    api.fire = weapon.fire;
    api.enemiesInRange = weapon.enemiesInRange;
    api.fireNearestEnemy = weapon.fireNearestEnemy;

    api.incDamage = api.damage.inc;
    api.incRange = api.range.inc;
    api.incRate = api.rate.inc;

    api.decRate = api.rate.dec;
    api.decRange = api.range.dec;
    api.decDamage = api.damage.dec;

    api.getRateEnergy = api.rate.getEnergyPoints;
    api.getRangeEnergy = api.range.getEnergyPoints;
    api.getDamageEnergy = api.damage.getEnergyPoints;

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
