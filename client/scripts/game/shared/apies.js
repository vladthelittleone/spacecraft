/**
 * Created by vladthelittleone on 21.10.15.
 */
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

    return api;
};

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

        if (callback)
        {
            world.getEnemies(id).forEach(function (e, i, arr)
            {
                var api = SpaceCraftApi(e);
                enemiesApi.push(api);
                callback(api, i, arr);
            })
        }

        return enemiesApi;
    };

    // Получить массив бонусов
    api.getBonuses = function (callback)
    {
        var bonusesApi = [];

        if (callback)
        {
            world.getBonuses().forEach(function (e, i, arr)
            {
                var api = BonusApi(e);
                bonusesApi.push(api);
                callback(api, i, arr);
            })
        }

        return bonusesApi;
    };
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

    return api;
};
