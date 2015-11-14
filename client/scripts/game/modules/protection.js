'use strict';

/**
 * Created by vladthelittleone on 12.11.15.
 */
var ProtectionBlock = function (spec)
{
    var that = {};

    var shield, health;

    var maxHealth = health = spec.health;
    var maxShield = shield = spec.shield;

    var shieldSprite = SCG.game.make.sprite(0, 0, 'shield');
    var sprite = spec.sprite;

    shieldSprite.anchor.x = 0.5;
    shieldSprite.anchor.y = 0.5;

    sprite.addChild(shieldSprite);

    var regenerationModule = that.regeneration = RegenerationModule({
        modulesManager: spec.modulesManager,
        values: [2, 4, 6, 8],
        energyPoints: 2
    });

    that.incRegen = regenerationModule.inc;
    that.decRegen = regenerationModule.dec;
    that.getRegenEnergy = regenerationModule.getEnergyPoints;
    that.getRegeneration = regenerationModule.getRegeneration;
    that.getRegenerationByPoints = regenerationModule.get;

    function regeneration(maxValue, value)
    {
        var deltaTime = SCG.game.time.elapsed / 1000;
        var deltaRegen = regenerationModule.getRegeneration() * deltaTime;

        if((maxValue - value) > deltaRegen)
        {
            return (value + deltaRegen);
        }
        else
        {
            return maxValue;
        }
    }

    that.addHealth = function (add)
    {
        health += add;
        maxHealth += add;
    };

    that.addShield = function (add)
    {
        shield += add;
        maxShield += add;
    };

    that.healthRegeneration = function ()
    {
        health = regeneration(maxHealth, health);
    };

    that.shieldRegeneration = function()
    {
        if (health >= maxHealth)
        {
            shieldSprite.visible = true;
            shield = regeneration(maxShield, shield);
        }
    };

    that.removeShield = function (delta)
    {
        shield -= delta;
    };

    that.getHealth = function ()
    {
        return Math.floor(health);
    };

    that.getShield = function ()
    {
        return Math.floor(shield);
    };

    that.subHealth = function (dec)
    {
        health -= dec;
    };

    that.addHealth = function (dec)
    {
        health += dec;
    };

    that.setHealth = function (h)
    {
        health = h;
    };

    that.subShield = function (dec)
    {
        if(shield <= 0)
        {
            shieldSprite.visible = false;
        }

        shield -= dec;
    };

    that.addShield = function (dec)
    {
        shield += dec;
    };

    that.setShield = function (s)
    {
        shield = s;
    };

    that.getMaxHealth = function ()
    {
        return maxHealth;
    };

    that.getMaxShield = function ()
    {
        return maxShield;
    };

    return that;
};
