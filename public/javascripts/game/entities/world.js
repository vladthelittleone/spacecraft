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

	t.initialization = initialization;
	t.pushObject = pushObject;
	t.removeObject = removeObject;
	t.get = get;
	t.getObjects = getObjects;
	t.update = update;
	t.getPlayer = getPlayer;
	t.setPlayer = setPlayer;
	t.getSprites = getSprites;
	t.getEnemies = getEnemies;

	return t;

	/**
	 * Добавить новый объект.
	 * К объекту добавляется параметр id - идентификатор объекта в мире.
     */
	function pushObject(obj) {

		let id = sequence.next();

		obj.id = id;

		objects[id] = obj;
		sprites[id] = obj.sprite;

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
	 * Возвращает врагов заданой фракции.
	 *
	 * @param faction
	 */
	function getEnemies(faction) {

		return lodash.filter(getObjects(), e => e.sprite.faction !== faction)

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

		return lodash.without(objects, undefined);

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
		playerId = null;

	}



}
