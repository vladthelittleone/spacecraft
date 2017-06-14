'use strict';

// Библиотеки
var lodash = require('lodash');

// Зависимости
var PrefabsFactory = require('../prefabs');
var BlocksFactory = require('../blocks');
var GameAudioFactory = require('../../audio');


// Экспорт
module.exports = Unit;

/**
 * Объект юнита.
 */
function Unit(args) {

	// Деструктуризация аргументов
	let {
		game, 					// Игровой объект
		x,						// Начальная координата x
		y,						// Начальная координата y
		player,					// Юнит игрока?
		faction,				// Фракция
		needAudio,				// Необходима аудио поддержка?
		preload,				// Имя спрайта
		maxHealth,				// Максимальное HP
		health = maxHealth,		// Начальные HP
		blocks					// Блоки, которые добавляются к кораблю
	} = args;

	// that / this
	let t = PrefabsFactory.createCustomUnit({game, x, y, faction, preload});

	let blocksManager = [];

	t.health = health;
	t.maxHealth = maxHealth;

	blockInitialization();

	/**
	 * Аудио менеджер.
	 */
	needAudio && (t.audio = GameAudioFactory(game, t, player));

	t.update = update;

	return t;

	/**
	 * Инициализация блоков корабля.
	 */
	function blockInitialization() {

		// Если передаваемые объекты undefined, то
		// Add[*]Block вернет undefined.
		lodash.forEach(blocks, b => {

			let addBlockFunction = BlocksFactory[b.type];
			let params = lodash.assign(args, b, {unit: t});

			// Если функции созадния блока не существует,
			// то continue.
			if (!addBlockFunction) {

				return;

			}

			// Добавляем блок
			blocksManager.push(addBlockFunction(params));

		});

	}

	/**
	 * Обновление крейсера.
	 */
	function update() {

		lodash.forEach(blocksManager, b => b.update());

		t.logic && t.logic(t);

	}

}
