'use strict';

Harvester.prototype = Object.create(Phaser.Sprite.prototype);
Harvester.prototype.constructor = Harvester;

Harvester.prototype.update = update;

module.exports = Harvester;

/**
 * Prefab транспорта.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Harvester(game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'harvester');

	// Центрирование
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	game.physics.arcade.enableBody(this);

}

function update() {


}
