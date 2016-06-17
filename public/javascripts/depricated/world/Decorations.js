/**
 * Created by vladthelittleone on 20.11.15.
 * @constructor
 */
var Decorations = function (spec)
{
    var that = {};
    var meteors = [];

	that.meteorType = 0;

	that.pushMeteor = function (args)
    {
		meteors.push(Meteor(args));
    };

    that.update = function ()
    {
		meteors.forEach(function (o)
        {
            o.update();
        });
    };

	that.getMeteors = function ()
	{
		return meteors;
	};

    return that;
};
