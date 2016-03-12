/**
 * @constructor
 */
var HarvesterApi = function (harvester)
{
	var api = {};
	var e = harvester.engine;

	api.rotateLeft = e.rotateLeft;
	api.rotateRight = e.rotateRight;
	api.rotateTo = e.rotateTo;
	api.moveForward = e.moveForward;
	api.moveBackward = e.moveBackward;
	api.moveTo = e.moveTo;
	api.moveToNearestBonus = e.moveToNearestBonus;

	api.getX = harvester.getX;
	api.getY = harvester.getY;

	api.harvest = harvester.harvest;

	return api;
};
