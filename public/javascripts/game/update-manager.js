'use strict';

// Экспорт
module.exports = UpdateManager();

/**
 * Сервис обмена кодом между игрой и ангуляровскими сервисами.
 *
 * @author Skurishin Vladislav
 * @since 21.10.15
 */
function UpdateManager() {

	// that / this
	var t = {};

	// Коллбек выполняющийся при обновлении игры.
	var postUpdate;

	// Коллбек выполняющийся перед обновлением.
	var preUpdate;

	t.setPreUpdate = setPreUpdate;
	t.setPostUpdate = setPostUpdate;

	t.pre = pre;
	t.post = post;

	return t;

	function setPreUpdate(_preUpdate) {

		preUpdate = _preUpdate;

	}

	function setPostUpdate(_postUpdate) {

		postUpdate = _postUpdate;

	}

	function post(botText) {

		return postUpdate && postUpdate(botText);

	}

	function pre() {

		return preUpdate && preUpdate(arguments);

	}

}
