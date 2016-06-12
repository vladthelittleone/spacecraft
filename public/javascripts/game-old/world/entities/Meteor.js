/**
 * Created by V-eNo-M on 19.11.2015.
 */
var Meteor = function (spec){

	var t = Prefab(spec);
    var game = t.game;

    // Объявляем группу коллизий.
    var meteorCollisionGroup = game.physics.p2.createCollisionGroup();
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
		if (spec.scale <= 0.1 && !utils.randomInt(0, 5000))
		{
			t.sprite.body.moveForward(utils.randomInt(1, 5));
		}

        t.sprite.body.rotateLeft(spec.speed);
    };

    return t;
};
