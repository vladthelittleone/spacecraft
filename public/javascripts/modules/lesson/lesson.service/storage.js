'use strict';

module.exports = Storage;

/**
 * Интерфейс локального хранилища
 *
 * Created by vladthelittleone on 08.06.16.
 */
function Storage($storage) {

	var that = {};

	that.set = set;
	that.getLessons = getLessons;
	that.getCurrent = getCurrent;
	that.setString = setString;
	that.getString = getString;

	return that;

	/**
	 * Задать параметр.
	 */
	function set(name, value) {

		$storage.local.setItem(name, JSON.stringify(value));

	}

	/**
	 * Вернуть текущий номер подурока.
	 */
	function getCurrent(lessonId) {

		var l = JSON.parse($storage.local.getItem('lessons'));

		if (l && l[lessonId]) {

			return parseInt(l[lessonId].current);

		}

		return 0;
	}

	/**
	 * Вернуть статистику урока.
	 */
	function getLessons() {

		return JSON.parse($storage.local.getItem('lessons')) || [];

	}

	/**
	 * Задать строку в лок. хранилище.
	 */
	function setString(name, value) {

		$storage.local.setItem(name, value);

	}

	/**
	 * Получить строку из хранилища.
	 */
	function getString(name) {

		return $storage.local.getItem(name);

	}
}
