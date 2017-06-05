'use strict';

// Зависимости
var lodash = require('lodash');

var sequence = require('../../utils/sequence');

module.exports = World();

/**
 * Объект, хранящий все объекты мира.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function World() {

	let t = {};

	let game;				// Игра.
	let playerId;			// Игрок.
	let objects = [];		// Массив всех объектов.
	let sprites = [];		// Массив всех спрайтов.
	let factions = {};		// Фракции.

	t.initialization = initialization;
	t.pushObject = pushObject;
	t.removeObject = removeObject;
	t.get = get;
	t.getObjects = getObjects;
	t.update = update;
	t.getPlayer = getPlayer;
	t.setPlayer = setPlayer;
	t.getSprites = getSprites;

	return t;



	/**
	 * Добавляем объект к заданной фракции.
	 *
	 * @param faction фракция
	 * @param obj объект
	 */
	function addToFaction(obj, faction) {

		if (!factions[faction]) {

			factions[faction] = [];

		}

		// Добавляем в пулл объектов фракции.
		factions[faction].push(obj);
	}

	/**
	 * Добавить новый объект.
	 * К объекту добавляется параметр id - идентификатор объекта в мире.
     */
	function pushObject(obj) {

		let id = sequence.next();
		let faction = obj.sprite.faction;

		obj.id = id;

		objects[id] = obj;
		sprites[id] = obj.sprite;

		faction && addToFaction(obj, faction);

		return obj.id;

	}

	/**
	 * Выполнить действия с phaser-группами врагов фракции.
	 *
	 * @return {Array} возвращаем группу для коллизий.
	 */
	function getSprites() {

		return sprites;

	}

	/**
	 * Удалить.
     */
	function removeObject(obj) {

		objects.removeElement(obj);
		sprites.removeElement(obj.sprite);

	}

	/**
	 * Вернуть сущность по идентификатору.
     */
	function get(id) {

		return objects[id];

	}

	/**
	 * Вернусть все сущности.
     */
	function getObjects() {

		return objects;

	}

	/**
	 * Обновить все объекты мира.
	 */
	function update() {

		objects.forEach(e => e.update && e.update(e));

	}

	/**
	 * Возвращаем игрока.
	 */
	function getPlayer() {

		return get(playerId);

	}

	/**
	 * Устанавливаем игрока.
	 */
	function setPlayer(id) {

		// Устанавливаем параметр игрока
		objects[id].isPlayer = true;

		playerId = id;

	}

	/**
	 * Инициализация.
	 */
	function initialization(_game) {

		game = _game;

		objects = [];
		factions = {};
		playerId = null;

	}



}
