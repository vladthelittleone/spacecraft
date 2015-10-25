/**
 * Created by vladthelittleone on 21.10.15.
 */

/**
 * @constructor
 */
var WorldApi = function (world, id)
{
    var api = {};

    api.getBounds = world.getBounds;

    api.getEnemies = function (callback)
    {
        var enemiesApi = [];

        world.getSpaceCrafts(id).forEach(function (e, i, arr)
        {
            var api = EnemyApi(e);
            enemiesApi.push(api);

            if (callback)
            {
                callback(api, i, arr);
            }
        });

        return enemiesApi;
    };

    // Получить массив бонусов
    api.getBonuses = function (callback)
    {
        var bonusesApi = [];

        world.getBonuses().forEach(function (e, i, arr)
        {
            var api = BonusApi(e);
            bonusesApi.push(api);
            if (callback)
            {
                callback(api, i, arr);
            }
        });

        return bonusesApi;
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
    api.getType = bonus.getType;

    return api;
};

/**
 * @constructor
 */
var SpaceCraftApi = function (spaceCraft)
{
    var api = {};

    api.weapon = WeaponApi(spaceCraft.weapon);
    api.getHealth = spaceCraft.getHealth;
    api.getShield = spaceCraft.getShield;
    api.getX = spaceCraft.getX;
    api.getY = spaceCraft.getY;
    api.getAngle = spaceCraft.getAngle;
    api.angleBetween = spaceCraft.angleBetween;
    api.distance = spaceCraft.distance;
    api.rotateLeft = spaceCraft.rotateLeft;
    api.rotateRight = spaceCraft.rotateRight;
    api.rotateTo = spaceCraft.rotateTo;
    api.moveForward = spaceCraft.moveForward;
    api.moveBackward = spaceCraft.moveBackward;
    api.getId = spaceCraft.getId;
    api.bonusInRange = spaceCraft.bonusInRange;

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

    api.enemiesInRange = function (callback)
    {
        return weapon.enemiesInRange(SCG.spaceCraft.getId(), callback);
    };

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
