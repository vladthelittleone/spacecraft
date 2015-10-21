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
    var type = spec.type;

    // Добавляем спрайт бонуса
    var sprite = that.sprite = game.add.sprite(x, y, spec.sprite);

    // Подключаем физику тел к бонусу
    game.physics.p2.enable(sprite, true);

    // Поварачиваем бонус на init-угол
    !spec.angle || (sprite.body.angle = spec.angle);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.setTo(0.5);
    sprite.checkWorldBounds = true;

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
        return type;
    };

    return that;
};

var HealthBonus = function (spec)
{
    var that = Bonus(spec);
    var health = spec.health;

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.addHealth(health);
    };

    return that;
};

var DamageBonus = function (spec)
{
    var that = Bonus(spec);
    var damage = spec.damage;

    that.useBonus = function (spaceCraft)
    {
        spaceCraft.weapon.addDamage(damage);
    };

    return that;
};
