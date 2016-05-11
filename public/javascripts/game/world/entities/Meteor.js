/**
 * Created by V-eNo-M on 19.11.2015.
 */
var Meteor = function (spec){

    var t = Unit(spec);

    var game = t.game;

    // Объявляем группу коллизий.
    var meteorCollisionGroup = game.phпysics.p2.createCollisionGroup();
	game.physics.p2.updateBoundsCollisionGroup();

    // Устанавливаем группу колизий
    t.sprite.body.setCollisionGroup(meteorCollisionGroup);
    t.sprite.body.collideWorldBounds = false;

    t.getX = function()
    {
        return t.sprite.x;
    };

    t.getY = function()
    {
        return t.sprite.y;
    };

    t.update = function ()
    {
        t.sprite.body.rotateLeft(0.5);
    };

    return t;
};
