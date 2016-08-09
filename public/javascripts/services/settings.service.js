'use strict';

module.exports = Settings;

/**
 * Сервис доступа к настройкам.
 */
function Settings() {

	var t = {};

	var settings = [];
	var listeners = [];

	t.setSettings = setSettings;
	t.isActive = isActive;
	t.onSettingsChange = onSettingsChange;

	t.SOUNDTRACK = "soundtrack";
	t.INTERACTIVE = "interactive";

	return t;

	function onSettingsChange(callback, type, callOnInit) {

		// Вызов коллбека при активности настройки,
		// заданного типа.
		if (callOnInit) {

			callback(isActive(type));

		}

		listeners.push({
			callback: callback,
			type: type
		});

	}

	function setSettings(_settings) {

		settings = _settings;

		listeners.forEach(function (e) {

			e.callback(isActive(e.type));

		});

	}

	function isActive(type) {

		var result = false;

		settings.forEach(function (e) {

			if (e.type === type) {

				result = e.value;

			}

		});

		return result;

	}
}
