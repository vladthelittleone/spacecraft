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
	t.AUTORUN = "autorun";

	return t;

	/**
	 * Функция подписки на изменение настроек. Добавляет коллбек
	 * в наблюдатели - {@code listeners} и вызывает его в случае изменения
	 * настройки заданного типа {@code type}.
	 *
	 * Заметим что в коллбек передается {@code boolean}, хранящий состояние активности
	 * настройки.
	 *
	 * @param callback коллбек выполняемый при изменении натроек.
	 * @param type тип настроек, при изменении которого, выполняем коллбек
	 * @param callOnInit выполнять ли коллбек при вызове функции, учитывая то,
	 * что заданная настройка активна
     */
	function onSettingsChange(callback, type, callOnInit) {

		// Вызов коллбека при активности настройки,
		// заданного типа.
		if (callOnInit) {

			callback(isActive(type));

		}

		// Подписываемся на изменения
		listeners.push({
			callback: callback,
			type: type
		});

	}

	/**
	 * Установка новых настроек.
	 * Оповещает все подписанные коллбеки.
	 *
	 * @param _settings
     */
	function setSettings(_settings) {

		settings = _settings;

		// Оповещение
		listeners.forEach(function (e) {

			e.callback(isActive(e.type));

		});

	}

	/**
	 * Проверка активности настройки.
	 *
	 * @see settings.json
	 * @param type тип настройки
	 * @returns {boolean} актвность настройки (t - активна, f - не активна)
     */
	function isActive(type) {

		var result = false;

		settings.forEach(function (e) {

			// Сравнение настройки по типу.
			if (e.type === type) {

				result = e.value;

			}

		});

		return result;

	}
}
