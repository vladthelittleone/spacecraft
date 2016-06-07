'use strict';

module.exports = Storage;

/**
 * Service that responding for web storage.
 */
function Storage () {

	var that = {};

	/**
	 * Local storage.
	 */
	that.local = initializeStorage(localStorage);

	/**
	 * Session storage.
	 */
	that.session = initializeStorage(sessionStorage);

	return that;

	/**
	 * Private function that return storage. If web storage not supported, then
	 * return custom storage with array. Also resolve issue with private mode.
	 */
	function initializeStorage(type) {

		// Check storage support.
		try {

			type.setItem('storage', '');

			type.removeItem('storage');

			return type;

		}
		catch (e) {

			// Custom storage.
			return {

				s: {},

				setItem: function (key, value) {

					this.s[key] = value;

				},

				getItem: function (key) {

					if (typeof this.s[key] != 'undefined') {

						return this.s[key];

					}
					else {

						return null;

					}

				},

				removeItem: function (key) {

					this.s[key] = undefined;

				},

				clear: function () {

					this.s.length = 0;

				}

			};

		}

	}

}
