/**
 * @constructor
 */
var ApiLesson1 = function (transport)
{
	var api = {};
	var e = transport.engine;

	api.rotateLeft = e.rotateLeft;
	api.rotateRight = e.rotateRight;
	api.rotateTo = e.rotateTo;
	api.moveForward = e.moveForward;
	api.moveBackward = e.moveBackward;
	api.moveTo = e.moveTo;
	api.moveToNearestBonus = e.moveToNearestBonus;

	api.getX = transport.getX;
	api.getY = transport.getY;

	return api;
};
