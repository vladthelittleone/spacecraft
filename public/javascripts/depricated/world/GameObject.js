/**
 * Created by vladthelittleone on 02.12.15.
 */
var GameObject = function (s)
{
	var t = s.inherit || {};

	var game = s.game;
	var type = s.type;
	var id = game.sc.seq.next();

	t.getId = function ()
	{
		return id
	};

	t.getType = function ()
	{
		return type;
	};

	return t;
};
