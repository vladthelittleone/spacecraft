'use strict';

Settings.$inject = [];

module.exports = Settings;

/**
 * Директива вывода информации о настройках.
 *
 * @since 03.08.16
 * @author Skurishin Vladislav
 */
function Settings() {

	var directive = {
		scope:       {

		},
		templateUrl: 'views/directives/settings.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {



	}

}
