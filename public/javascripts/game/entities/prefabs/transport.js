'use strict';

Transport.prototype = Object.create(Phaser.Sprite.prototype);
Transport.prototype.constructor = Transport;

Transport.prototype.update = update;

module.exports = Transport;

/**
 * Prefab транспорта.
 *
 * Created by vladthelittleone on 11.06.16.
 */
function Transport(game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'transport');

	// Центрирование
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	game.physics.arcade.enableBody(this);

}

function update() {


}
