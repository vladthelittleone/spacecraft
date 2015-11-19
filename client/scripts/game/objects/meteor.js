/**
 * Created by V-eNo-M on 19.11.2015.
 */

var Meteor = function (spec){

    var that = {};

    var game = SCG.game;
    var x = that.x = spec.x;
    var y = that.y = spec.y;
    var velocityX = utils.randomInt(-2,2);
    var velocityY = utils.randomInt(-2,2);

    // Добавляем спрайт метеора
    var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

    game.physics.p2.enable(sprite);


    that.getX = function()
    {
        return sprite.x;
    };

    that.getY = function()
    {
        return sprite.y;
    };
};

//that.update = function ()
//{
//    // Произошла коллизия бонуса с кораблем
//    sprite.body.x = that.x + velo
//    sprite.body.rotateLeft(rotateDirection);
//    sprite.body.moveForward(1);
//};

//
//var generateBonus = function (spec)
//{
//    var meteor = utils.randomInt(1, 3);
//
//    switch (meteor)
//    {
//        case 1: return HealthBonus({health: spec.health});
//        case 2: return DamageBonus({damage: spec.damage});
//        case 3: return ShieldBonus({shield: spec.shield});
//    }
//};