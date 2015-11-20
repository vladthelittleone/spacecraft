/**
 * Created by vladthelittleone on 20.11.15.
 * @constructor
 */
var Decorations = function (spec)
{
    var that = {};
    var objects = [];

    that.createMeteors = function (args)
    {
        for (var i = 0; i < args.count; i++)
        {
            objects.push(Meteor({
                angle: SCG.game.rnd.angle(),
                x: SCG.game.world.randomX,
                y: SCG.game.world.randomY,
                scale: utils.randomInt(1, 3) * 0.25,
                spriteName: 'meteor' + utils.randomInt(1, 7)
            }));
        }
    };

    that.update = function ()
    {
        objects.forEach(function (o)
        {
            o.update();
        });
    };

    return that;
};
