/**
 * Created by vaimer on 13.07.16.
 */
'use strict';

module.exports = SpaceCraftTrail;

function SpaceCraftTrail (game, spaceCraft){

	var t = {};

	var sprite = spaceCraft.sprite;

	t.emitter = game.add.emitter(sprite.x - 25, sprite.y - 26, 50);

	t.emitter.gravity = 0;
	t.emitter.setAlpha(1, 0, 1000);
	t.emitter.setScale(0.8, 0, 0.8, 0, 1000);

	t.emitter.setXSpeed(0, 0);
	t.emitter.setYSpeed(50, 50);

	t.emitter.makeParticles('fire');

	t.emitter.start(false, 1000, 30);

	t.update = update;

	return t;

	function update() {

		t.emitter.x = sprite.x;
		t.emitter.y = sprite.y;

	}
}
