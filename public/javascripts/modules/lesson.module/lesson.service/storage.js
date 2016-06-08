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

		var json = $storage.local.getItem('lessons');

		var lessons = json && JSON.parse(json);

		if (lessons && lessons[lessonId]) {

			return parseInt(lessons[lessonId].current);

		}

		return 0;
	}

	/**
	 * Вернуть статистику урока.
	 */
	function getLessons() {

		var json = $storage.local.getItem('lessons');

		return json && JSON.parse(json) || [];

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
