var AudioManager = function (game, sprite)
{
	var that = {};

	var game = that.game = game;
	var sprite = that.sprite = sprite;

	function play (volume, audioName)
	{
		if (sprite.visible && volume > 0)
		{
			var audio = game.add.audio(audioName);

			audio.volume = volume;
			audio.play();
		}
	}

	function volume (isUser, min, max)
	{
		return isUser? max : min;
	}

	that.playLaser = function (isUser)
	{
		play(volume(isUser, 0.01, 0.015), 'laser1');
	};

	that.playExplosion = function (isUser)
	{
		play(volume(isUser, 0.05, 0.2), 'explosion2');
	};

	that.playSmallExplosion = function (isUser)
	{
		play(volume(isUser, 0.001, 0.005), 'explosion2');
	};

	that.playDestructionShield = function (isUser)
	{
		play(volume(isUser, 0, 0.1), 'shield1');
	};

	that.playTakeBonus = function (isUser)
	{
		play(volume(isUser, 0, 0.03), 'bonus1');
	};

	that.playHarvest = function ()
	{
		play(0.01, 'harvest1');
	};

	return that;
};

