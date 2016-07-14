/**
 * Created by vaimer on 13.07.16.
 */
'use strict';

module.exports = SpaceCraftTrail;

function SpaceCraftTrail (game, spaceCraft){

	var t = {};

	var sprite = spaceCraft.sprite;
	var pointBottomRight = sprite.bottomRight();
	var pointCenter = sprite.center;

	t.emitter = game.add.emitter(pointCenter, pointBottomRight.y, 50);

	t.emitter.gravity = -20;
	t.emitter.setAlpha(1, 0, 1000);
	t.emitter.setScale(0.8, 0, 0.8, 0, 1000);

	t.emitter.setXSpeed(0, 0);
	t.emitter.setYSpeed(50, 50);

	t.emitter.makeParticles('fire');

	t.update = update;
	t.start = start;
	t.end = end;

	return t;

	function update() {

		t.emitter.x = sprite.x;
		t.emitter.y = sprite.y;

	}

	function start() {

		t.emitter.start(false, 1000, 30);

	}

	function end() {

	}
}
