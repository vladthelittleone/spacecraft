'use strict';

/**
 * @constructor
 */
var AcademyBase = function (spec)
{
	spec.anchX = 0.8;

	var t = Unit(spec);

	// Объявляем группу коллизий.
	var meteorCollisionGroup = t.game.physics.p2.createCollisionGroup();
	t.game.physics.p2.updateBoundsCollisionGroup();

	// Устанавливаем группу колизий
	t.sprite.body.setCollisionGroup(meteorCollisionGroup);

	t.update = function ()
	{
		t.sprite.body.rotateLeft(0.1);
	};

	return t;
};
