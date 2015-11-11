'use strict';

/**
 * Created by vladthelittleone on 12.11.15.
 */
var EngineBlock = function (spec)
{
    var that = {};
    var spaceCraft = spec.spaceCraft;
    var sprite = spaceCraft.sprite;

    var moveSpeed = that.moveSpeed = MoveSpeedModule({
        modulesManager: spec.modulesManager,
        values: [10, 20, 30, 40],
        energyPoints: 2
    });

    that.rotateLeft = function ()
    {
        sprite.body.rotateLeft(moveSpeed.getEnergyPoints());
    };

    that.rotateRight = function ()
    {
        sprite.body.rotateRight(moveSpeed.getEnergyPoints());
    };

    /**
     * Поворот к объекту.
     *
     * @param another - объект
     * @returns {boolean} true/false - совершил поворот / не совершил
     */
    that.rotateTo = function (another)
    {
        var angle = spaceCraft.angleBetween(another);

        // Угол меньше 20 - не делаем поворот
        if (Math.abs(angle) > 20)
        {
            if (angle > 0)
            {
                that.rotateRight();
            }
            else
            {
                that.rotateLeft();
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    that.moveForward = function ()
    {
        sprite.body.moveForward(moveSpeed.getMoveSpeed());
    };

    that.moveBackward = function ()
    {
        sprite.body.moveBackward(moveSpeed.getMoveSpeed() / 2);
    };

    that.moveTo = function (x, y)
    {
        if (x)
        {
            x = typeof x.getX === 'function' ? x.getX() : x;
            y = typeof x.getY === 'function' ? x.getY() : y;

            var point =
            {
                getX: function () {
                    return x;
                },

                getY: function () {
                    return y;
                }
            };
            that.rotateTo(point);
            that.moveForward();
        }
        else
        {
            that.moveForward();
        }
    };

    that.moveToNearestBonus = function()
    {
        var bMin = Number.MAX_VALUE;
        var bonus;

        SCG.world.bonusInRange(sprite, spaceCraft.weapon.getFireRange(), function (b)
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

        that.moveTo(bonus);
    };


    return that;
};
