'use strict';

/**
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
var SpaceCraft = function (spec)
{
    //===================================
    //============== INIT ===============
    //===================================

	// Включаем проверку на коллизии с границей
	spec.checkWorldBounds = true;

	// Параметры игры
	var sc = spec.game.sc;
	var scope = sc.scope;
	var world = sc.world;

	var t = world.factory.createGameObject({
        type: world.spaceCraftType,
		inherit: Unit(spec)
    });

    // Стратегия, которая будет использоваться
    // для бота, либо игроква
	var strategy = spec.strategy;

	// Статистика корабля
	t.statistic = Statistic();

	// Аудио для персонажа
	var audio = t.audio = new AudioManager(t.game, t.sprite, function()
	{
		return scope.spaceCraft.getId() === t.getId();
	});

	var modulesManager = t.modulesManager = ModulesManager({
		energyPoints: spec.energyPoints
	});

    //  Добавляем группу коллизий
	t.sprite.name = t.getId();
	t.sprite.body.setCollisionGroup(sc.collisionGroups.spaceCraft);
	t.sprite.body.collides(sc.collisionGroups.bonus);

	t.addEngineBlock = function()
	{
		t.engine = EngineBlock({
			modulesManager: modulesManager,
			spaceCraft: t,
			game: t.game
		});
	};

	t.addProtectionBlock = function(args)
	{
		t.protection = ProtectionBlock({
			spaceCraft: t,
			health: args.health,
			shield: args.shield,
			modulesManager: modulesManager,
			spriteShield: args.spriteShield,
			game: t.game,
			shieldScale: args.shieldScale
		});
	};

	t.addWeaponBlock = function (args)
	{
		t.weapon = WeaponBlock({
			spaceCraft: t,
			modulesManager: modulesManager,
			velocity: args.velocity,
			spriteName: args.beamSprite,
			game: t.game,
			audio: audio
		});

		// Переносим на верхний слой, перед лазерами.
		t.sprite.bringToTop();
	};

	t.addAllBlocks = function (args)
	{
		t.addEngineBlock();
		t.addWeaponBlock(args);
		t.addProtectionBlock(args);
	};

    //===================================
    //============== THAT ===============
    //===================================

    t.update = function ()
    {
		t.weapon && t.weapon.update();
		t.protection && t.protection.update();

        strategy && strategy({
			spaceCraft: t,
			game: t.game
		});
    };

	// Переносим на верхний слой, перед лазерами.
	t.sprite.bringToTop();

    // Добавляем наш корабль в мир
    world.pushObject(t);

    return t;
};
