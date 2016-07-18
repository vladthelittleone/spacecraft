/**
 * Created by vaimer on 13.07.16.
 */
'use strict';

module.exports = SpaceCraftTrail;

function SpaceCraftTrail (game, spaceCraft){

	var t = {};

	var sprite = spaceCraft.sprite;

	t.emitter = game.add.emitter(0, 0, 10);
	t.emitter.makeParticles('trail');

	sprite.addChild(t.emitter);

	t.emitter.y = 0;
	t.emitter.x = - sprite.width / 2;
	t.emitter.lifespan = 100;
	t.emitter.maxParticleSpeed = new Phaser.Point(-50,25);
	t.emitter.minParticleSpeed = new Phaser.Point(-100,-25);

	t.start = start;

	return t;

	function start() {

		t.emitter.emitParticle();
	}

}
