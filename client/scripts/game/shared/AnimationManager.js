/**
 * Created by Ivan on 18.12.2015.
 */

var AnimationManager = function(spec)
{
	var deadGroup = [];
	var game = spec.game;

	function explosion(x, y, scale)
	{
		var boomSprite = new Explosion();

		// массив это то какие кадры использовать и в какой последовательности
		var anim = boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

		anim.killOnComplete = true;
		anim.onComplete.add(function() {
			deadGroup.add(this);
		}, boomSprite);
		anim.play('boom');
	}

	function update()
	{
		deadGroup.forEach
		(
			function(sprite)
			{
				sprite.destroy();
			}
		);
	}
}
//// вторая констатна это количество кадров в секунду при воспроизвелении анимации
//boomSprite.play('boom', 16, false, true);
