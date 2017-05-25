'use strict';

RepeatFinished.$inject = ['$sce'];

module.exports = RepeatFinished;

/**
 * @author Ivan Makovchik
 * @since 18.01.2016
 */
function RepeatFinished() {

	return function (scope) {

		// По таймауту выполняется событие ngRepeatFinished
		if (scope.$last) setTimeout(function () {

			scope.$emit('ngRepeatFinished');

		}, 1);

	}

}
