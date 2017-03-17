/**
 * Created by iretd on 14.03.17.
 */

var validator = require('validator');

module.exports = ValidateEmail;

function ValidateEmail() {

	var directive = {

		require:  'ngModel',
		restrict: '',
		link:     link

	};

	return directive;

	function link(scope, elem, attrs, ctrl) {

		ctrl.$validators.email = function (modelValue, viewValue) {

			if (!viewValue) {

				return false;

			}

			return validator.isEmail(viewValue);

		}

	}

}
