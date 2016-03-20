var AudioManager = function (game, sprite, callback)
{
	var that = {};

	var game = that.game = game;
	var sprite = that.sprite = sprite;

	function play (audioName, min, max)
	{
		var volume;

		if (callback)
		{
			volume = callback() ? max : min;
		}
		else
		{
			volume = min;
		}

		if (volume > 0  && sprite.inCamera)
		{
			var audio = game.add.audio(audioName);

			audio.volume = volume;
			audio.play();
		}
	}

	that.playLaser = function ()
	{
		play('laser1', 0.01, 0.015);
	};

	that.playExplosion = function ()
	{
		play('explosion2', 0.05, 0.2);
	};

	that.playSmallExplosion = function ()
	{
		play('explosion2', 0.001, 0.005);
	};

	that.playDestructionShield = function ()
	{
		play('shield1', 0, 0.1);
	};

	that.playTakeBonus = function ()
	{
		play('bonus1', 0, 0.03);
	};

	that.playHarvest = function ()
	{
		play('harvest1', 0.01, 0.01);
	};

	return that;
};

