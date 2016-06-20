'use strict';

RepeatFinished.$inject = ['$sce'];

module.exports = RepeatFinished;

/**
 * Created by Ivan on 18.01.2016.
 */
function RepeatFinished() {

	return function (scope) {

		// По таймауту выполняется событие ngRepeatFinished
		if (scope.$last) setTimeout(function () {

			scope.$emit('ngRepeatFinished');

		}, 1);

	}

}
