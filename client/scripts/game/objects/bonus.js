/**
 * Created by vladthelittleone on 21.10.15.
 * Класс бонусов выпадающих после
 * Уничтожения корабля
 * @constructor
 */
var Bonus = function (spec)
{
    var that = {};

    var game = SCG.game;
    var x = that.x = spec.x;
    var y = that.y = spec.y;
    var bonusType = spec.bonusType;
    var rotateDirection = utils.randomOf(-1, 1);

    // Добавляем спрайт бонуса
    var sprite = that.sprite = game.add.sprite(x, y, bonusType.spriteName);

    // Подключаем физику тел к бонусу
    game.physics.p2.enable(sprite);

    // Поварачиваем бонус на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.setTo(0.5);
    sprite.checkWorldBounds = true;

    // Устанавливаем маленькую массу,
    // что б при столкновении с бонусом
    // кораблик не взаимодействовал с ней.
    sprite.body.mass = 0.00001;

    // Устанавливаем группу колизий
    sprite.body.setCollisionGroup(SCG.bonusCollisionGroup);

    var bonusTake = function (bonus, spaceCraft)
    {
        if (bonus.sprite)
        {
            var s = SCG.world.getSpaceCraft(spaceCraft.sprite.name);

            bonusType.useBonus(s);

            // Удоляем бонус
            SCG.world.removeBonus(this);
            bonus.sprite.destroy();
            bonus.destroy();

            s.statistic.addBonus();
        }
    };

    that.getX = function()
    {
        return sprite.x;
    };

    that.getY = function()
    {
        return sprite.y;
    };

    that.getType = function()
    {
        return bonusType.name;
    };

    that.update = function ()
    {
        // Произошла коллизия бонуса с кораблем
        sprite.body.collides(SCG.spaceCraftCollisionGroup, bonusTake, this);
        sprite.body.rotateLeft(rotateDirection);
        sprite.body.moveForward(1);
    };

    var bonusTake = function (bonus, spaceCraft)
    {
        if (bonus.sprite)
        {
            var s = SCG.world.getSpaceCraft(spaceCraft.sprite.name);

            bonusType.useBonus(s);

            // Удоляем бонус
            SCG.world.removeBonus(this);
            bonus.sprite.destroy();
            bonus.destroy();
        }
    };

    return that;
};

var HealthBonus = function (spec)
{
    var that = {};
    var health = spec.health;

    that.spriteName = 'bonus1';
    that.name = "health";

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.addHealth(health);
    };

    return that;
};

var DamageBonus = function (spec)
{
    var that = {};
    var damage = spec.damage;

    that.spriteName = 'bonus2';
    that.name = "damage";

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.weapon.addDamage(damage);
    };

    return that;
};

var generateBonus = function (spec)
{
    return utils.random() ? HealthBonus({health: spec.health}) : DamageBonus({damage: spec.damage});
};
