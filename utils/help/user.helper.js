/**
 * Created by iretd on 30.03.17.
 */

var lodash = require('lodash');

function UserHelper() {

	var t = {};
	
	/**
	 * 
	 * @param user
	 * @returns {boolean}
     */
	function isItEmailUser(user) {

		return lodash.isNil(user.vkId);

	}

}
