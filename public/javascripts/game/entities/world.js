'use strict';

// Зависимости
var sequence = require('../../utils/sequence');

module.exports = World;

/**
 * Объект, хранящий все объекты мира.
 *
 * Created by vladthelittleone on 21.10.15.
 * @constructor
 */
function World() {

	var t = {};

	var player;			// Игрок
	var objects = [];	// Массив всех объектов

	t.pushObject = pushObject;
	t.removeObject = removeObject;
	t.get = get;
	t.getObjects = getObjects;
	t.update = update;
	t.getPlayer = getPlayer;
	t.setPlayer = setPlayer;

	return t;

	/**
	 * Добавить новый объект.
	 * К объекту добавляется параметр id - идентификатор объекта в мире.
     */
	function pushObject(obj) {

		var id = sequence.next();

		obj.id = id;

		objects[id] = obj;

		return obj.id;

	}

	/**
	 * Удалить.
     */
	function removeObject(obj) {

		objects.removeElement(obj);

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

		objects.forEach(function (e) {

			e.update && e.update(e);

		});

	}

	/**
	 * Возвращаем игрока.
	 */
	function getPlayer() {

		return get(player);
	}

	/**
	 * Устанавливаем игрока.
	 */
	function setPlayer(id) {

		// Устанавливаем параметр игрока
		objects[id].isPlayer = true;

		player = id;

	}

}
