'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * Класс бонусов выпадающих после
 * Уничтожения корабля
 * @constructor
 */
var Bonus = function (spec)
{
	var bonusType = spec.bonusType;
	var rotateDirection = utils.randomOf(-1, 1);
	var game = spec.game;
	var sc = game.sc;

	spec.scale = 0.65;
	spec.checkWorldBounds = true;
	spec.spriteName = bonusType.spriteName;

	var t = sc.world.factory.createGameObject({
        type: game.sc.world.bonusType,
		inherit: Unit(spec)
    });

	var audio = new AudioManager(game, t.sprite, function()
	{
		return sc.scope.spaceCraft.getId() == t.sprite.name;
	});

	t.sprite.name = t.getId();

	// Устанавливаем маленькую массу,
    // что б при столкновении с бонусом
    // кораблик не взаимодействовал с ней.
    t.sprite.body.mass = 0.00001;

    // Устанавливаем группу колизий
    t.sprite.body.setCollisionGroup(sc.collisionGroups.bonus);

    var bonusTake = function (bonus, spaceCraft)
    {
        if (bonus.sprite)
        {
            var s = sc.world.getSpaceCraft(spaceCraft.sprite.name);

            bonusType.useBonus(s);

            // Удаляем бонус
            sc.world.removeObject(t);

            bonus.sprite.destroy();
            bonus.destroy();

            s.statistic.addBonus();

			audio.playTakeBonus();
        }
    };

    t.getX = function()
    {
        return t.sprite.x;
    };

    t.getY = function()
    {
        return t.sprite.y;
    };

    t.getBonusType = function()
    {
        return bonusType.name;
    };

    t.update = function ()
    {
        // Произошла коллизия бонуса с кораблем
        t.sprite.body.collides(sc.collisionGroups.spaceCraft, bonusTake, this);
        t.sprite.body.rotateLeft(rotateDirection);
        t.sprite.body.moveForward(1);
    };

    sc.world.pushObject(t);

    return t;
};

var HealthBonus = function (spec)
{
    var that = {};
    var health = spec.health;

    that.spriteName = 'bonus2';
    that.name = "health";

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.protection.addHealth(health);
    };

    return that;
};

var DamageBonus = function (spec)
{
    var that = {};
    var damage = spec.damage;

    that.spriteName = 'bonus1';
    that.name = 'damage';

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.weapon.addDamage(damage);
    };

    return that;
};

var ShieldBonus = function (spec)
{
    var that = {};
    var shield = spec.shield;

    that.spriteName = 'bonus3';
    that.name = 'shield';

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.protection.addShield(shield);
    };

    return that;
};

var generateBonus = function (spec)
{
    var bonus = utils.randomInt(1, 3);

    switch (bonus)
    {
        case 1: return HealthBonus({health: spec.health});
        case 2: return DamageBonus({damage: spec.damage});
        case 3: return ShieldBonus({shield: spec.shield});
    }
};
