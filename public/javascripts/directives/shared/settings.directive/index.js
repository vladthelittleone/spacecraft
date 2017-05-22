'use strict';

Settings.$inject = ['settings'];

var Storage = require('../../../utils/storage');

var settings = require('./settings.json');

module.exports = Settings;

/**
 * Директива вывода информации о настройках.
 *
 * @since 03.08.16
 * @author Skurishin Vladislav
 */
function Settings(service) {

	var storage = Storage();

	var directive = {
		scope:       {},
		templateUrl: 'views/directives/settings.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.toggle = toggle;

		initialize();

		function setSettings(settings) {

			$scope.settings = settings;

			storage.local.setItem('settings', JSON.stringify(settings));

			// Установка настроек в сервисе хранения настроек.
			// Из сервиса они доступны из вне.
			service.setSettings(settings);

		}

		function toggle(item) {

			item.value = !item.value;

			setSettings($scope.settings);

		}

		function initialize() {

			// Формирование настроек из стореджа.
			var stored = storage.local.getItem('settings');

			// Если настройки были найдены
			// в локальном сторедже.
			if (stored) {

				// То парсим их и устанавливаем.
				setSettings(JSON.parse(stored));

			} else {

				// Иначе устанавливаем по-умолчанию.
				setSettings(settings);

			}

		}

	}

}
