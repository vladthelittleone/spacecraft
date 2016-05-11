'use strict';

/**
 * Created by vladthelittleone on 12.11.15.
 */
var ProtectionBlock = function (spec)
{
    var t = {};

    //===================================
    //============== INIT ===============
    //===================================

	var game = spec.game;

	// Параметры игры
	var spaceCraft = spec.spaceCraft;
	var sprite = spaceCraft.sprite;

	var sc = game.sc;
	var scope = sc.scope;
	var world = sc.world;
    var shield, health;

    var maxHealth = health = spec.health;
    var maxShield = shield = spec.shield;

	// Жив ли персонаж?
	var isAlive = true;

    var shieldSprite = game.make.sprite(0, 0, spec.spriteShield || 'shield');

    shieldSprite.anchor.x = 0.5;
    shieldSprite.anchor.y = 0.5;

	spec.shieldScale && shieldSprite.scale.setTo(spec.shieldScale);

	sprite.addChild(shieldSprite);

    var regenerationModule = t.regeneration = RegenerationModule({
        modulesManager: spec.modulesManager,
        values: [2, 4, 6, 8],
        energyPoints: 2
    });

    //===================================
    //============== PRIVATE ============
    //===================================

	function destroy(damageCraft)
	{
		var bonusType = generateBonus({
			health: 10,
			damage: 10,
			shield: 10
		});

		// Создание нового бонуса и занесение его в bonusArray
		utils.random() && world.factory.createBonus({
			bonusType: bonusType,
			scale: spec.scale,
			x: sprite.x,
			y: sprite.y,
			angle: game.rnd.angle()
		});

		world.factory.createExplosion({
			x: sprite.x,
			y: sprite.y
		});

		damageCraft.statistic.addKillEnemy();

		isAlive = false;

		if (scope.spaceCraft.getId() === spaceCraft.getId())
		{
			spaceCraft.statistic.calculateTotalScore();
			scope.editorOptions.isCodeRunning = false;
		}

		var modX = world.getBounds().height - 320;
		var modY = world.getBounds().width - 320;

		var nx = game.world.randomX % modX + 200;
		var ny = game.world.randomY % modY + 200;

		sprite.reset(nx, ny);

		t.setHealth(t.getMaxHealth());
		t.setShield(t.getMaxShield());
	}

    function regeneration(maxValue, value)
    {
        var deltaTime = game.time.elapsed / 1000;
        var deltaRegen = regenerationModule.getRegeneration() * deltaTime;

        if((maxValue - value) > deltaRegen)
        {
            return (value + deltaRegen);
        }
        else
        {
            return maxValue;
        }
    }

    function initApi()
    {
        t.incRegen = regenerationModule.inc;
        t.decRegen = regenerationModule.dec;
        t.getRegenEnergy = regenerationModule.getEnergyPoints;
        t.getRegeneration = regenerationModule.getRegeneration;
        t.getRegenerationByPoints = regenerationModule.get;
    }

    //===================================
    //============== THAT ===============
    //===================================

	t.hit = function (damage, damageCraft)
	{
		if(t.getShield() > 0)
		{
			t.subShield(damage);

			// если щит сломался, то в нем окажется отрицательное значение,
			// которое прибавлем к текущему здоровью
			if(t.getShield() <= 0)
			{
				t.subHealth(t.getShield());
				t.setShield(0);

				// проигрываем звук разрушения щита
				spaceCraft.audio.playDestructionShield();
			}
		}
		else
		{
			t.subHealth(damage);
		}

		if (t.getHealth() <= 0)
		{
			// проигрываем звук взрыва коробля
			spaceCraft.audio.playExplosion();

			destroy(damageCraft);
		}
	};

	t.isAlive = function ()
	{
		return isAlive;
	};

	t.addHealth = function (add)
    {
        var a = Math.abs(add);

        health += a;
        maxHealth += a;
    };

    t.addShield = function (add)
    {
        var a = Math.abs(add);

        shield += a;
        maxShield += a;
    };

    t.healthRegeneration = function ()
    {
        health = regeneration(maxHealth, health);
    };

    t.shieldRegeneration = function()
    {
        if (health >= maxHealth)
        {
            shield = regeneration(maxShield, shield);

            if (shield > 0)
            {
                shieldSprite.visible = true;
            }
        }
    };

	t.update = function ()
	{
		t.healthRegeneration();
		t.shieldRegeneration();
	};

    t.getHealth = function ()
    {
        return Math.floor(health);
    };

    t.getShield = function ()
    {
        return Math.floor(shield);
    };

    t.subHealth = function (dec)
    {
        health -= Math.abs(dec);
    };

    t.setHealth = function (h)
    {
        health = Math.abs(h);
    };

    t.subShield = function (dec)
    {
        shield -= Math.abs(dec);

        if(shield <= 0)
        {
            shieldSprite.visible = false;
        }
    };

    t.setShield = function (s)
    {
        shield = Math.abs(s);
    };

    t.getMaxHealth = function ()
    {
        return maxHealth;
    };

    t.getMaxShield = function ()
    {
        return maxShield;
    };

    initApi();

    return t;
};
