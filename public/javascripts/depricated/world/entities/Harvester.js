'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var Harvester = function (spec)
{
	spec.shieldScale = 0.5;

	var t = SpaceCraft(spec);

	t.addEngineBlock();
	t.addProtectionBlock(spec);

	// Дальность сбора
	var harvestRange = spec.harvestRange;

	// Грузоподъемность
	var maxTank = spec.maxTank;

	// Дальность сбора
	var harvestRate = spec.harvestRate;

	// Время до следующего сбора
	var harvestTime = 0;

	var currentMeteor = null;
	var currentTank = 0;

	var sprite = t.sprite;
	var game = t.game;
	var graphics = game.add.graphics();
	var line;

	var audio = new AudioManager(game, sprite);

	//===================================
	//============== THAT ===============
	//===================================

	t.getCurrentTank = function ()
	{
		return currentTank;
	};

	t.getMaxTank = function ()
	{
		return maxTank;
	};

	t.harvest = function ()
	{
		function tryToHarvest()
		{
			// Проверка делэя. Не собираем каждый фрэйм.
			if (game.time.now > harvestTime)
			{
				if (!currentMeteor || Phaser.Point.distance(sprite, currentMeteor) > harvestRange)
				{
					currentMeteor = getMeteorInRange();
				}
				else
				{
					graphics.clear();
					graphics.moveTo(sprite.x, sprite.y);
					graphics.lineStyle(2, 0xDE5151);

					line = graphics.lineTo(currentMeteor.x, currentMeteor.y);

					currentTank++;
				}

				harvestTime = game.time.now + harvestRate;

				// воспроизводим звук для события
				audio.playHarvest();
			}
		}

		function getMeteorInRange()
		{
			var meteors = sc.world.decorations.getMeteors();
			var res = null;

			meteors.forEach(function (m)
			{
				if (Phaser.Point.distance(sprite, m.sprite) < harvestRange)
				{
					res = m.sprite;
				}
			});

			return res;
		}

		if (currentTank != maxTank)
		{
			tryToHarvest();
		}
		else
		{
			graphics.clear();
		}
	};

	t.debark = function (another)
	{

	};

	return t;
};
