'use strict';

/**
 * Created by vladthelittleone on 02.12.15.
 */
var PlayState = function (spec)
{
	var t = {};

	var game = spec.game;
	var scope = game.sc.scope;

	var tileSprite;
	var cursors;

	//===================================
	//============== HELP ===============
	//===================================

	var followFor = t.followFor = function (object)
	{
		game.camera.follow(object);
		game.camera.deadzone = new Phaser.Rectangle(200, 200, 300, 300);
		game.camera.focusOn(object);
	};

	t.keysControl = function ()
	{
		if (cursors.up.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.y -= 4;
		}
		else if (cursors.down.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.y += 4;
		}

		if (cursors.left.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.x -= 4;
		}
		else if (cursors.right.isDown)
		{
			game.camera.unfollow(scope.spaceCraft.sprite);
			game.camera.x += 4;
		}

		if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown)
		{
			followFor(scope.spaceCraft.sprite);
		}

		// Удаляем прослушку, так как наш редактор кода, тоже прослушивает
		// Нажатие клавиш
		game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	};

	t.gameInit = function (bounds, paused)
	{
		tileSprite = game.add.tileSprite(bounds.x, bounds.y, bounds.width, bounds.height, 'starField');
		tileSprite.fixedToCamera = true;

		game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

		cursors = game.input.keyboard.createCursorKeys();
		game.paused = paused;
	};

	t.updateTileSprite = function ()
	{
		tileSprite.tilePosition.set(game.camera.x * -0.3, game.camera.y * -0.3);
	};

	return t;
};
