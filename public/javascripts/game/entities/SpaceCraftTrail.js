/**
 * Created by vaimer on 13.07.16.
 */
'use strict';

module.exports = SpaceCraftTrail;

function SpaceCraftTrail (game, transport){

	var emitter = game.add.emitter(transport.sprite.x,transport.sprite.y, 400);

	emitter.gravity = 200;
	emitter.setAlpha(1, 0, 3000);
	emitter.setScale(0.8, 0, 0.8, 0, 3000);

	emitter.makeParticles(['fire']);

	emitter.start(false, 3000, 50);
	
	return emitter;
	
	function update(x, y) {
		emitter.x = x;
		emitter.y = y;
	}
}
