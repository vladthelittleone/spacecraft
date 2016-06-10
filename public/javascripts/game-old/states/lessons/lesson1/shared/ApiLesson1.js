/**
 * @constructor
 */
var ApiLesson1 = function (transport)
{
	var api = {};
	var e = transport.engine;
	var moveForwardCalled = false;

	api.moveForward = function ()
	{
		e.moveForward();
		moveForwardCalled = true;
	};

	api.rotateLeft = e.rotateLeft;
	api.rotateRight = e.rotateRight;
	api.rotateTo = e.rotateTo;
	api.moveBackward = e.moveBackward;
	api.moveTo = e.moveTo;
	api.moveToNearestBonus = e.moveToNearestBonus;

	api.getX = transport.getX;
	api.getY = transport.getY;

	transport.isMoveForwardCalled = function ()
	{
		return moveForwardCalled;
	};

	return api;
};
